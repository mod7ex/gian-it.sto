import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import save from '~/helpers/save';

import useToast from '~/composables/useToast.js';

const toaster = useToast();

const state = reactive({
  raw: [],
  statuses: [],
});

const locallyDropRequest = (v) => {
  state.raw.deleteById(v);
};

const dropProduct = (product_id) => {
  if (!product_id) return;

  state.raw = state.raw.filter(({ product: { id } }) => product_id != id);
};

const replace = (payload) => {
  if (!payload.id) return;

  for (let i = 0; i < state.raw.length; i++) {
    if (state.raw[i].product?.id === payload?.id) {
      state.raw[i].product = payload;
    }
  }
};

const updateCount = (product_id, count) => {
  if (!product_id) return;

  for (let i = 0; i < state.raw.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (state.raw[i].product?.id == product_id) {
      state.raw[i].product.count -= count;
    }
  }
};

const reset = () => { state.raw = []; state.statuses = []; };

const setRequestStatus = async (productRequest_id, status) => {
  if (!productRequest_id) return;
  const { success, message } = await save({ path: `products-requests/${productRequest_id}/status`, data: { status } });
  if (success) {
    // locallyDropRequest(productRequest_id);
    return toaster.success('Product assigned');
  }
  return toaster.danger(message ?? 'что-то пошло не так');
};

const getProductsRequests = (arr = []) => arr.reduce((prev, request) => {
  // {product_id: [...requests]}
  const productId = request.product?.id;
  if (productId in prev) {
    prev[productId].push(request);
  } else {
    prev[productId] = [request];
  }

  return prev;
}, {});

const loadStatuses = async () => {
  const { success, statuses } = await $({ key: 'products-requests/get-statuses' });
  if (success) state.statuses = statuses;
};

const load = async (payload) => {
  state.raw = await $.products_requests(payload);
};

const drop = async (id) => _$.order(id, locallyDropRequest);

const productsRequests = computed(() => getProductsRequests(state.raw));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  loadStatuses,
  productsRequests,
  replace,
  updateCount,

  // eslint-disable-next-line no-unused-vars
  products: computed(() => Object.entries(productsRequests.value).map(([_, [{ product }]]) => product)),
  setRequestStatus,
  locallyDropRequest,
  dropProduct,
};
