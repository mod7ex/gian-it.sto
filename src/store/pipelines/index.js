import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions';

const hasCrud = userHasPermission('crud pipelines');

const state = reactive({
  raw: [],
  order_funnel: {},
  types: {},
});

const reset = () => {
  state.raw = [];
};

const load_orders_funnel = async () => {
  if (state.order_funnel.id) return state.order_funnel.id;

  // We suppose that there is only one funnel for orders
  const pipelines = await $.pipelines({ type: 'order' });

  const theFunnel = pipelines[0];

  if (theFunnel) {
    state.order_funnel = theFunnel;
    return theFunnel.id;
  }
};

const load = async (payload = {}) => {
  if (!hasCrud) return;
  state.raw = await $.pipelines(payload);
};

const loadTypes = async () => {
  state.types = (await $({ toast: true, key: 'pipelines/get-types' })).types;
};

const drop = async (id) => _$.pipeline(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  options: computed(() => state.raw.map(({ id, name }) => ({ label: name, value: id }))),
  typesOptions: computed(() => Object.entries(state.types).map(([value, label]) => ({ value, label }))),

  orderFunnelOption: computed(() => [{ value: state.order_funnel?.id, label: state.order_funnel?.name }]),

  load_orders_funnel,
  load,
  reset,
  drop,
  loadTypes,
};
