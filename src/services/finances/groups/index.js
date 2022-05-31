import { ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $financeGroups } from '~/helpers/fetch.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud finances');

const { apiRequest } = useApi();

const rawGroups = ref([]);

const fetchGroups = async () => {
  if (!hasCRUD) return;
  rawGroups.value = await $financeGroups();
};

/* ************ Delete finance-groups ************ */

const dropGroup = async (id) => {
  const { call, errorMsg, success } = apiRequest(`finance-groups/${id}`, { method: 'delete' });

  await call();

  success.value && rawGroups.value.deleteById(id);

  const deletionMsg = success.value ? 'финансовые группы успешно удален' : (errorMsg.value ?? 'Не удалось удалить финансовые группы !');

  return { message: deletionMsg, success: success.value };
};

export default function () {
  return {
    rawGroups,
    fetchGroups,
    dropGroup,
    hasCRUD,
  };
}
