import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (pipeline_id) => {
  state.raw = await $.stages({ pipeline_id });
};

const drop = async (id) => _$.stage(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  reset,
  drop,
};
