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
    toaster.success('Product assigned');
    return;
  }
  toaster.danger(message ?? 'что-то пошло не так');
};

const productsRequests = computed(() => state.raw.reduce((prev, request) => {
  // {product_id: [...requests]}
  const productId = request.product?.id;
  if (productId in prev) {
    prev[productId].push(request);
  } else {
    prev[productId] = [request];
  }

  return prev;
}, {}));

const loadStatuses = async () => {
  const { success, statuses } = await $({ key: 'products-requests/get-statuses' });
  if (success) state.statuses = statuses;
};

const load = async (payload) => {
  state.raw = await $.products_requests(payload);
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  loadStatuses,
  productsRequests,
  setRequestStatus,
  // products: computed(() => state.raw.map(({ product }) => product)),
};
