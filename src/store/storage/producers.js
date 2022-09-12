import { computed, reactive, readonly } from 'vue';
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

const load = async (payload = {}) => {
  state.raw = await $.producers(payload);
};

const drop = async (id) => _$.producer(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  add,
  reset,
  producers: computed(() => state.raw.map(({ id, name, created_at }) => ({ id, name, created_at: created_at?.split(' ')[0] }))),
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
