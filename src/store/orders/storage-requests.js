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

const reset = () => { state.raw = []; state.statuses = []; };

const setRequestStatus = async (productRequest_id, status) => {
  if (!productRequest_id) return;
  const { success, message } = await save({ path: `products-requests/${productRequest_id}/status`, data: { status } });
  if (success) {
    state.raw.deleteById(productRequest_id);
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

const productsRequests = computed(() => getProductsRequests(state.raw));

const loadStatuses = async () => {
  const { success, statuses } = await $({ key: 'products-requests/get-statuses' });
  if (success) state.statuses = statuses;
};

const load = async (payload) => {
  const data = await $.products_requests(payload);
  state.raw = data;
  // eslint-disable-next-line no-unused-vars
  return Object.entries(getProductsRequests(data)).map(([_, [{ product }]]) => product); // return products
};

const locallyDropRequest = (v) => {
  state.raw.deleteById(v);
};

const drop = async (id) => _$.order(id, locallyDropRequest);

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  loadStatuses,
  productsRequests,
  setRequestStatus,
  locallyDropRequest,
  // products: computed(() => state.raw.map(({ product }) => product)),
};
