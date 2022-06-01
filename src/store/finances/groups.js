import { reactive, readonly, computed } from 'vue';
import { $financeGroups } from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud finances');

const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $financeGroups();
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`finance-groups/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'финансовые группы успешно удален' : (errorMsg.value ?? 'Не удалось удалить финансовые группы !');

  return { message: deletionMsg, success: success.value };
};

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
