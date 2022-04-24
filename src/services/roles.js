import { ExclamationIcon } from '@heroicons/vue/outline';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const { showToast } = useToast();

const { showResultConfirmDialog } = useConfirmDialog();

const { axiosInstance } = useApi();

const rawRoles = ref([]);

export default function rolesService() {
  const router = useRouter();

  const roles = computed(() => rawRoles.value.map((role) => ({
    id: role.id,
    name: role.title,
    created_at: role.created_at,
  })));

  const fetchRoles = async () => {
    try {
      const { data } = await axiosInstance.get('/roles');

      if (!data.success) throw Error();

      rawRoles.value = data.roles || [];
    } catch (e) {
      console.error('Error request', e);
      showToast("Couldn't fetch roles", 'red', ExclamationIcon);
    }
  };

  /* ************ Delete role ************ */

  const deleteRole = (id) => {
    rawRoles.value.splice(
      rawRoles.value.findIndex((user) => user.id === id),
      1,
    );
  };

  const dropRole = async (id) => {
    let wasRoleDeleted = false;
    let deletionMessage = null;

    try {
      const { data } = await axiosInstance.delete(`roles/${id}`);

      if (!data.success) throw Error();

      deleteRole(id);

      deletionMessage = 'Роль успешно удалена';
      wasRoleDeleted = true;
    } catch (e) {
      console.error('Error request', e);

      if (e.response) {
        console.error('Error responce', e, e.response.data);
        deletionMessage = e.response.data.message;
      } else if (e.request) {
        console.log('Error request', e.request);
        deletionMessage = 'Не удалось удалить роль';
      } else {
        console.log('Error local', e.message);
        deletionMessage = e.message;
      }

      wasRoleDeleted = false;
    } finally {
      showResultConfirmDialog(deletionMessage, wasRoleDeleted);
    }
  };

  /* ************ Update role ************ */
  const movetoEditRolePage = async (id) => {
    if (!id) return;
    await router.push({ name: 'EditRole', params: { id } });
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
