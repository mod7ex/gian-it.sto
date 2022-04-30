import { ref, computed, readonly } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const { danger } = useToast();
const { apiRequest } = useApi();

const filter = readonly([
  { criteria: 'id', label: 'По умолчанию' },
  { criteria: 'surname', label: 'По фамилии' },
  { criteria: 'department', label: 'По отделам' },
]);

const order = ref({
  // show filter area
  show: false,
  // id, surname or department
  criteria: 'id',
  //  asc:1 or  desc:-1 the default always is desc:-1
  mod: -1,
});

const users = ref([]);
const selected = ref(false);
const selectedUser = ref({});

const usersCount = computed(() => users.value.length);

const orderkey = computed(
  () => `${order.value.criteria}-${order.value.mod === 1 ? 'asc' : 'desc'}`,
);

const directory = computed(
  () => [...new Set(users.value.map(({ surname }) => (surname ? surname[0].toUpperCase() : '_')))]
    .sort()
    .reduce((userGroups, key) => {
      // eslint-disable-next-line no-param-reassign
      userGroups[key] = users.value.filter(({ surname }) => (surname ? surname[0].toUpperCase() : '_') === key)
        .map(({ id, name, surname, office_position: op, avatar }) => ({
          id,
          title: `${name} ${surname ?? ''}`,
          subtitle: `${op || ''}`,
          image: `${avatar || ''}`,
        }));
      return userGroups;
    }, {}),
);

const reOrder = (ctr = 'id') => {
  order.value.mod = order.value.criteria === ctr ? -order.value.mod : -1;

  order.value.criteria = ctr;

  // sort by criteria
  switch (ctr) {
    case 'id':
      users.value = users.value.sort(
        (a, b) => (a.id - b.id) * order.value.mod,
      );
      break;

    case 'surname':
      users.value = users.value.sort((a, b) => {
        if (a.surname > b.surname) return order.value.mod;
        if (a.surname < b.surname) return -order.value.mod;
        return 0;
      });
      break;

    case 'department':
      users.value = users.value.sort(
        (a, b) => (a.department?.id - b.department?.id) * order.value.mod,
      );
      break;

    default:
      break;
  }
};

const setSelectedUser = (user = null) => {
  selectedUser.value = user
    ? users.value.find(({ id }) => id === user.id) ?? {}
    : {};
  selected.value = !!user;
};

/* ************ Delete user ************ */
const deleteUser = (userId) => !!users.value.splice(
  users.value.findIndex(({ id }) => id === userId),
  1,
).length;

const dropUser = async (id) => {
  const { call, errorMsg, success } = apiRequest(`users/${id}`, { method: 'delete' });

  await call();

  const wasEmployerDeleted = success.value;

  wasEmployerDeleted && deleteUser(id) && setSelectedUser();

  const deletionMsg = wasEmployerDeleted ? 'Employer was deleted successfully.' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: wasEmployerDeleted };
};

/* ************ Fetch employer ************ */
const fetchEmployers = async (searchPayload = '') => {
  const { call, data, errorMsg, success } = apiRequest('/users', {
    params: {
      order: order.value.criteria,
      name: searchPayload,
    },
  });

  await call();

  !success.value && danger(errorMsg.value ?? "Couldn't fetch employers !");

  users.value = data.value.users || [];

  order.value.mod = -1; // return to desc(default) order mod
};

export default function employersService() {
  return {
    users,
    deleteUser,
    directory,
    reOrder,
    orderkey,
    filter,
    order,
    usersCount,
    selected,
    selectedUser,
    dropUser,
    setSelectedUser,
    fetchEmployers,
  };
}
