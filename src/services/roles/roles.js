import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $roles } from '~/helpers/fetch.js';

let redirect;
let isEditRolePage;

const { apiRequest } = useApi();

const rawRoles = ref([]);

const roles = computed(() => rawRoles.value.map((role) => ({
  id: role.id,
  name: role.title,
  created_at: role.created_at,
})));

const fetchRoles = async () => { rawRoles.value = await $roles(); };

/* ************ Delete role ************ */

const dropRole = async (id) => {
  const { call, errorMsg, success } = apiRequest(`roles/${id}`, { method: 'delete' });

  await call();

  success.value && rawRoles.value.deleteById(id);

  const deletionMsg = success.value ? 'Роль успешно удалена.' : (errorMsg.value ?? 'Не удалось удалить Роль !');

  isEditRolePage.value && await redirect({ name: 'Roles' });

  return { message: deletionMsg, success: success.value };
};

/* ************ ==> To Update role page ************ */
const movetoEditRolePage = async (id) => {
  await redirect({ name: 'EditRole', params: { id } });
};

export default function rolesService() {
  const { redirectTo, isThePage } = useAppRouter('EditRole');

  [redirect, isEditRolePage] = [redirectTo, isThePage];

  return {
    rawRoles,
    roles,
    fetchRoles,
    movetoEditRolePage,
    dropRole,
  };
}
