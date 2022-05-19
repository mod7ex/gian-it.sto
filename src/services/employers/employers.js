import { computed, ref, shallowRef } from 'vue';
import useApi from '~/composables/useApi.js';
import useOrder from '~/composables/useOrder.js';
import { $employers } from '~/helpers/fetch.js';
import useAuth from '~/composables/useAuth.js';
import { userHasPermission } from '~/lib/permissions.js';

const { userDepartment } = useAuth();
const hasCRUDdepartments = userHasPermission('crud departments');

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

const selectedUser = shallowRef({});
const selected = computed(() => !!selectedUser.value?.id);
const setSelectedUser = (user) => { selectedUser.value = user ? users.value.find(({ id }) => id === user?.id) ?? {} : {}; };

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
// eslint-disable-next-line camelcase
const fetchEmployers = async (searchPayload = '', department_id = hasCRUDdepartments ? undefined : userDepartment.value) => {
  selectedUser.value = {};

  order.active.value = false;

  users.value = await $employers({ order: order.criteria.value, name: searchPayload, department_id });

  order.reset();
};

export default function employersService() {
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
  };
}
