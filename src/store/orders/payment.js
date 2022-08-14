import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  pages: 100,
});

const reset = () => {
  state.raw = [];
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
  reset,
};
