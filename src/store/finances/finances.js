import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud finances');

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const addFinance = (v) => {
  const i = state.raw.findIndex(({ id }) => v?.id == id);
  if (i < 0) {
    state.raw.push(v);
  } else {
    state.raw[i] = v;
  }
};

const updateStatus = (v, status) => {
  const i = state.raw.findIndex(({ id }) => v == id);
  if (i < 0) return;
  state.raw[i].status = status;
};

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
  if (state.pending) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'finances', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.finances ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const sort = (v) => {
  state.raw.sort(v);
};

const drop = async (id) => _$.finance(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  sort,
  fill,
  updateStatus,
  addFinance,
};
