import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasPermission = userHasPermission('crud processes');

const { drop: dropWrapper } = useConfirmDialog();

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const addItem = (v) => {
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

const fill = async (payload) => {
  if (state.pending) return;
  if (!hasPermission) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'process_categories', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.process_categories ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const load = async () => {
  state.raw = await $.process_categories();
};

const drop = (id) => dropWrapper(async () => _$.process_category(id, (v) => {
  state.raw.deleteById(v);
}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  fill,
  addItem,
  options: computed(() => state.raw.map(({ id, name }) => ({ label: name, value: id }))),
};
