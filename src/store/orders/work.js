import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
});

const add = (v) => {
  const i = state.raw.findIndex(({ id }) => v?.id == id);
  if (i < 0) {
    state.raw.push(v);
  } else {
    state.raw[i] = v;
  }
};

const reset = () => {
  state.raw = [];
};

const load = async (payload) => {
  state.raw = await $.works(payload);
};

const drop = async (id) => _$.work(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  add,
  reset,
};
