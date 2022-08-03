import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  inStock: true,
  selectedId: undefined,
  pages: 1000,
  page: 1,
});

const setAvailability = (bool) => {
  state.inStock = bool ?? false;
};

const replace = (payload) => {
  if (!payload.id) return;
  const i = state.raw.findIndex(({ id }) => id === payload.id);
  state.raw[i] = payload;
};

const reset = (clear_selected = false) => {
  state.raw = [];
  state.pages = 1000;
  state.page = 1;
  clear_selected && (state.selectedId = undefined);
  state.inStock = true;
};

const sort = (v) => {
  state.raw.sort(v);
};

const select = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  state.selectedId = Number.isNaN(id) ? undefined : id;
};

const load = async (payload = {}) => {
  state.raw = await $.products(payload);
};

const fill = async (payload) => {
  // in payload should be included storage_id
  if (state.page > state.pages) return;
  const data = await $({ key: 'products', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.products ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const drop = async (id) => _$.product(id, (v) => {
  state.raw.deleteById(v);
});

const locallyDropProduct = (v) => {
  state.raw.deleteById(v);
};

export default {
  state: readonly(state),
  setAvailability,
  load,
  sort,
  drop,
  reset,
  fill,
  select,
  replace,
  selected: computed(() => !!(state.selectedId)),
  products: computed(() => state.raw.filter(({ count }) => (state.inStock ? count > 0 : count === 0))),
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
  locallyDropProduct,
};
