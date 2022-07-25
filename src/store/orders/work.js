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
  state.raw = await $.works(payload);
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
};
