import { ref, computed, readonly } from 'vue';
import { ExclamationIcon } from '@heroicons/vue/outline';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const { showResultConfirmDialog } = useConfirmDialog();

const { axiosInstance } = useApi();

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

export default function employers() {
  const usersNumber = computed(() => users.value.length);

  const { showToast } = useToast();

  const orderkey = computed(
    () => `${order.value.criteria}-${order.value.mod === 1 ? 'asc' : 'desc'}`,
  );

  const directory = computed(
    () => [...new Set(users.value.map((item) => (item.surname ? item.surname[0] : '_')))]
      .sort()
      .reduce((userGroups, key) => {
        // eslint-disable-next-line no-param-reassign
        userGroups[key] = users.value.filter((user) => (user.surname ? user.surname[0] : '_') === key)
          .map((user) => ({
            id: user.id,
            title: `${user.name} ${user.surname ? user.surname : ''}`,
            subtitle: `${user.office_position ? user.office_position : ''}`,
            image: `${user.avatar ? user.avatar : ''}`,
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

  const setSelectedUser = (user) => {
    selectedUser.value = user
      ? users.value.find((item) => item.id === user.id) || {}
      : {};
    selected.value = !!user;
  };

  /* ************ Delete role ************ */

  const deleteUser = (id) => {
    users.value.splice(
      users.value.findIndex((user) => user.id === id),
      1,
    );
  };

  const dropUser = async (id) => {
    // User deletion
    let isUserDeleted = false;
    let deletionMessage = null;

    try {
      const { data } = await axiosInstance.delete(`users/${id}`);

      if (!data.success) throw Error();

      isUserDeleted = true;
      deletionMessage = 'Пользователь успешно удален';

      deleteUser(id);

      setSelectedUser();
    } catch (e) {
      console.error('Error request', e);

      isUserDeleted = false;
      deletionMessage = 'Не удалось удалить пользователя';
    } finally {
      showResultConfirmDialog(deletionMessage, isUserDeleted);
    }
  };

  const fetchEmployers = async (searchPayload = '') => {
    try {
      let url = `/users?order=${order.value.criteria}`;
      url += searchPayload ? `&name=${searchPayload}` : '';
      // if (searchPayload) url += `&name=${searchPayload}`;
      const { data } = await axiosInstance.get(url);
      users.value = data.users;
      order.value.mod = -1; // return to desc(default) order mod
    } catch (e) {
      console.error('Error request', e);
      showToast("Couldn't fetch employers", 'red', ExclamationIcon);
    }
  };

  return {
    users,
    deleteUser,
    directory,
    reOrder,
    orderkey,
    filter,
    order,
    usersNumber,
    selected,
    selectedUser,
    dropUser,
    setSelectedUser,
    fetchEmployers,
  };
}
