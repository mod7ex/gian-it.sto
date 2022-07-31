import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (payload) => {
  const key = `products-requests/${payload?.order_id ? `order/${payload.order_id}` : ''}`;
  const { success, product_requests } = await $({ key });
  if (success) state.raw = product_requests;
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
};
