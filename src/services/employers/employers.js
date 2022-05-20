import { computed, ref, watch } from 'vue';
import useApi from '~/composables/useApi.js';
import useOrder from '~/composables/useOrder.js';
import { $employers } from '~/helpers/fetch.js';
import departments from '~/services/departments/departments';

const { currentDepartment } = departments();

const { apiRequest } = useApi();

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

const users = ref([]);
const usersCount = computed(() => users.value.length);

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { users.value.sort(v); });

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

const selectedUserId = ref();
const setSelectedUser = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  selectedUserId.value = Number.isNaN(id) ? undefined : id;
};

const selectedUser = computed(() => (selectedUserId.value ? users.value.find(({ id }) => id === selectedUserId.value) ?? {} : {}));
const selected = computed(() => !!selectedUser.value.id);

/* ************ Delete user ************ */
const deleteUser = (userId) => !!users.value.splice(
  users.value.findIndex(({ id }) => id === userId),
  1,
).length;

const dropUser = async (id) => {
  const { call, errorMsg, success } = apiRequest(`users/${id}`, { method: 'delete' });

  await call();

  success.value && deleteUser(id) && setSelectedUser();

  const deletionMsg = success.value ? 'Сотрудник успешно удален' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: success.value };
};

/* ************ Fetch employer ************ */
const loading = ref(false);

// eslint-disable-next-line camelcase
const fetchEmployers = async (searchPayload) => {
  loading.value = true;

  order.active.value = false;

  users.value = await $employers({ order: order.criteria.value, name: searchPayload ?? '', department_id: currentDepartment.value });

  order.reset();

  loading.value = false;
};

export default function employersService() {
  watch(currentDepartment, async () => {
    await fetchEmployers();
  });

  return {
    order,
    users,
    deleteUser,
    directory,
    usersCount,
    selected,
    selectedUser,
    dropUser,
    setSelectedUser,
    fetchEmployers,
    selectedUserId,
    loading,
  };
}
