import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  pages: 100,
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

const setStatus = (_id, st) => {
  const i = state.raw.findIndex(({ id }) => _id == id);
  if (i < 0) return;
  state.raw[i].status = st;
};

const load = async (payload) => {
  state.raw = await $.payments(payload);
};

const drop = async (id) => _$.payment(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  add,
  reset,
  setStatus,
};
