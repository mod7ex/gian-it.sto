import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useConfirmDialog from "~/composables/useConfirmDialog.js";
import useApi from "~/composables/useApi.js";

const { showResultConfirmDialog } = useConfirmDialog();

const { axiosInstance } = useApi();

let rawRoles = ref([]);

export default function useEmployers() {
  let router = useRouter();

  let roles = computed(() =>
    rawRoles.value.map((role) => ({
      id: role.id,
      name: role.title,
      created_at: role.created_at,
    }))
  );

  let fetchRoles = async () => {
    try {
      let { data } = await axiosInstance.get(`/roles`);

      if (!data.success) throw Error();

      rawRoles.value = data.roles || [];
    } catch (e) {
      console.error("Error request", e);
    }
  };

  /* ************ Delete role ************ */

  let deleteRole = (id) => {
    rawRoles.value.splice(
      rawRoles.value.findIndex((user) => user.id === id),
      1
    );
  };

  let dropRole = async (id) => {
    let wasRoleDeleted = false;
    let deletionMessage = null;

    try {
      let { data } = await axiosInstance.delete(`roles/${id}`);

      if (!data.success) throw Error();

      deleteRole(id);

      deletionMessage = "Роль успешно удалена";
      wasRoleDeleted = true;
    } catch (e) {
      console.error("Error request", e);

      if (e.response) {
        console.error("Error responce", e, e.response.data);
        deletionMessage = e.response.data.message;
      } else if (e.request) {
        console.log("Error request", e.request);
        deletionMessage = "Не удалось удалить роль";
      } else {
        console.log("Error local", e.message);
        deletionMessage = e.message;
      }

      wasRoleDeleted = false;
    } finally {
      showResultConfirmDialog(deletionMessage, wasRoleDeleted);
    }
  };

  /* ************ Update role ************ */
  let movetoEditRolePage = async (id) => {
    if (!id) return;
    await router.push({ name: "EditRole", params: { id } });
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
