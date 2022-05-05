import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $roles } from '~/helpers/fetch.js';
import { maybeRun } from '~/helpers';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud roles');

let redirect;
let isEditRolePage;

const { apiRequest } = useApi();

const rawRoles = ref([]);

const roles = computed(() => rawRoles.value.map((role) => ({
  id: role.id,
  name: role.title,
  created_at: role.created_at,
})));

const fetchRoles = maybeRun(async () => { rawRoles.value = await $roles(); }, hasCRUD);

/* ************ Delete role ************ */
const deleteRole = (id) => {
  rawRoles.value.splice(
    rawRoles.value.findIndex((role) => role.id === id),
    1,
  );
};

const dropRole = maybeRun(async (id) => {
  const { call, errorMsg, success } = apiRequest(`roles/${id}`, { method: 'delete' });

  await call();

  success.value && deleteRole(id);

  const deletionMsg = success.value ? 'Role was deleted successfully.' : (errorMsg.value ?? 'Не удалось удалить Роль');

  isEditRolePage.value && await redirect({ name: 'Roles' });

  return { message: deletionMsg, success: success.value };
}, hasCRUD);

/* ************ To Update role page ************ */
const movetoEditRolePage = maybeRun(async (id) => {
  await redirect({ name: 'EditRole', params: { id } });
}, hasCRUD);

export default function rolesService() {
  const { redirectTo, isThePage } = useAppRouter('EditRole');

  [redirect, isEditRolePage] = [redirectTo, isThePage];

  return {
    rawRoles,
    roles,
    fetchRoles,
    deleteRole,
    movetoEditRolePage,
    dropRole,
  };
}
