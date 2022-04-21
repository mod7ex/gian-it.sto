import { ref, readonly, computed } from "vue";

import useApi from "~/composables/useApi.js";
const { axiosInstance } = useApi();

let rawRoles = ref([]);

export default function useEmployers() {
  let roles = computed(() =>
    rawRoles.value.map((role) => ({
      id: role.id,
      name: role.title,
      created_at: role.created_at,
    }))
  );

  let deleteRoleLocally = (id) => {
    rawRoles.value.splice(
      rawRoles.value.findIndex((user) => user.id === id),
      1
    );
  };

  let fetchRoles = async () => {
    try {
      let { data } = await axiosInstance.get(`/roles`);

      if (!data.success) throw Error();

      rawRoles.value = data.roles || [];
    } catch (e) {
      console.error("Error request", e);
    }
  };

  return {
    rawRoles,
    roles,
    fetchRoles,
    deleteRoleLocally,
  };
}
