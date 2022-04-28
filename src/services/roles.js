import { ExclamationIcon } from '@heroicons/vue/outline';
import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

const rawRoles = ref([]);

export default function rolesService() {
  const { showToast } = useToast();
  const { apiRequest } = useApi();
  const { redirectTo } = useAppRouter('EditRole');

  const roles = computed(() => rawRoles.value.map((role) => ({
    id: role.id,
    name: role.title,
    created_at: role.created_at,
  })));

  const fetchRoles = async () => {
    const { call, data, errorMsg, success } = apiRequest('/roles');

    await call();

    !success.value && showToast(errorMsg.value ?? "Couldn't fetch roles !", 'red', ExclamationIcon);

    rawRoles.value = data.value.roles || [];
  };

  /* ************ Delete role ************ */
  const deleteRole = (id) => {
    rawRoles.value.splice(
      rawRoles.value.findIndex((role) => role.id === id),
      1,
    );
  };

  const dropRole = async (id) => {
    const { call, errorMsg, success } = apiRequest(`roles/${id}`, { method: 'delete' });

    await call();

    const wasRoleDeleted = success.value;

    wasRoleDeleted && deleteRole(id);

    const deletionMsg = wasRoleDeleted ? 'Role was deleted successfully.' : (errorMsg.value ?? 'Не удалось удалить Роль');

    await redirectTo({ name: 'Roles' });

    return { message: deletionMsg, success: wasRoleDeleted };
  };

  /* ************ To Update role page ************ */
  const movetoEditRolePage = async (id) => {
    await redirectTo({ name: 'EditRole', params: { id } });
  };

  return {
    rawRoles,
    roles,
    fetchRoles,
    deleteRole,
    movetoEditRolePage,
    dropRole,
  };
}
