import { reactive, readonly, computed } from 'vue';
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

const addGroup = (v) => {
  const i = state.raw.findIndex(({ id }) => v?.id == id);
  if (i < 0) {
    state.raw.push(v);
  } else {
    state.raw[i] = v;
  }
};

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.finance_groups();
};

const fill = async (payload) => {
  if (state.pending) return;
  if (!hasCRUD) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'finance_groups', ...payload, page: state.page });
  state.raw = state.raw.concat(data?.finance_groups ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const drop = async (id) => _$.finance_group(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  addGroup,
  fill,
  drop,
  reset,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
