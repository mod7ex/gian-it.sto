import { ExclamationIcon } from '@heroicons/vue/outline';
import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

const rawRoles = ref([]);

export default function rolesService() {
  const { showToast } = useToast();
  const { apiRequest } = useApi();
  const { redirectTo, isThePage, router } = useAppRouter('EditRole');

  const roles = computed(() => rawRoles.value.map((role) => ({
    id: role.id,
    name: role.title,
    created_at: role.created_at,
  })));

  const fetchRoles = async () => {
    const request = apiRequest('/roles');

    await request.fetch();

    (request.error.value || !request.data.value.success) && showToast(request.errorMsg.value ?? "Couldn't fetch roles !", 'red', ExclamationIcon);

    rawRoles.value = request.data.value.roles || [];
  };

  /* ************ Delete role ************ */
  const deleteRole = (id) => {
    rawRoles.value.splice(
      rawRoles.value.findIndex((role) => role.id === id),
      1,
    );
  };

  const dropRole = async (id) => {
    const request = apiRequest(`roles/${id}`, { method: 'delete' });

    await request.fetch();

    const wasRoleDeleted = !request.error.value && request.data.value.success;

    wasRoleDeleted && deleteRole(id);

    const deletionMsg = wasRoleDeleted ? 'Role was deleted successfully.' : (request.errorMsg.value ?? 'Не удалось удалить Роль');

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
