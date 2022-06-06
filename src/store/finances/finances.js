import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud finances');

const { apiRequest } = useApi();

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
});

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (payload = {}) => {
  if (!hasCRUD) return;
  state.raw = await $.finances(payload);
};

const fill = async (payload) => {
  if (state.page > state.pages) return;
  const data = await $({ key: 'finances', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.finances ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const sort = (v) => {
  state.raw.sort(v);
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`finances/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'Сотрудник успешно удален' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: success.value };
};

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  sort,
  fill,
};
