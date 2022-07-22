import { reactive, readonly, computed } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import store from './index';

const { load_orders_funnel } = store;

const state = reactive({
  raw: [],
  pipeline: undefined,
});

const reset = () => { state.raw = []; };

const load_orders_stages = async () => {
  const pipeline_id = await load_orders_funnel();

  if (!pipeline_id) return;

  state.pipeline = pipeline_id;
  state.raw = await $.stages({ pipeline_id });
};

const load = async (pipeline_id) => {
  state.raw = await $.stages({ pipeline_id });
};

const drop = async (id) => _$.stage(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),
  options: computed(() => state.raw.map(({ id, name }) => ({ label: name, value: id }))),

  load_orders_stages,
  load,
  reset,
  drop,
};
