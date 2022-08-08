import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  inStock: true,
  selectedId: undefined,
  pages: 1000,
  page: 1,
  pending: false,
});

const IndexById = (_id) => {
  for (let i = 0; i < state.raw.length; i++) {
    // eslint-disable-next-line
    if (state.raw[i]?.id == _id) {
      return i;
    }
  }
};

const addProductRequest = (product_id, payload) => {
  state.raw[IndexById(product_id)].product_requests.push(payload);
};

const updateCount = (product_id, count) => {
  state.raw[IndexById(product_id)].count += count;
};

const dropRequestFromProduct = (request_id, product_id) => {
  state.raw[IndexById(product_id)].product_requests.deleteById(request_id);
};

const contains = (requests = [], _status) => requests.some(({ status }) => status === _status);

const getProducts = (is_requests_page) => computed(() => {
  // const foo = state.raw.filter(({ count }) => (state.inStock ? count > 0 : count === 0)).filter(({ product_requests }) => contains(product_requests, 'wait'));
  const items = state.raw.filter(({ count }) => (state.inStock ? count > 0 : count === 0));
  if (!is_requests_page) return items;
  const result = items.filter(({ product_requests }) => contains(product_requests, 'wait'));
  return result;
});

const setAvailability = (bool) => { state.inStock = bool ?? false; };

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
  if (state.pending) return;
  // in payload should be included storage_id
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'products', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.products ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const drop = async (id) => _$.product(id, (v) => {
  state.raw.deleteById(v);
});

const locallyDropProduct = (v) => {
  state.raw.deleteById(v);
};

const products = computed(() => state.raw.filter(({ count }) => (state.inStock ? count > 0 : count === 0)));

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
  products,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
  locallyDropProduct,
  getProducts,
  dropRequestFromProduct,
  updateCount,
  addProductRequest,
};
