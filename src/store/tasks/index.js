import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

const hasREAD = userHasAtLeastOnePermission(['read tasks', 'read department tasks', 'read own tasks']);

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (payload = {}) => {
  if (!hasREAD) return;
  state.raw = await $.tasks(payload);
};

const fill = async (payload = {}) => {
  if (state.pending) return;
  if (!hasREAD) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'tasks', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.tasks ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const sort = (v) => {
  state.raw.sort(v);
};

const drop = async (id) => _$.task(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  sort,
  fill,
};
