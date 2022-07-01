import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (type = 'task') => {
  state.raw = await $.pipelines({ type });
};

const drop = async (id) => _$.pipeline(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  reset,
  drop,
};
