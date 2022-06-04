import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (payload = {}) => {
  state.raw = await $.cities(payload);
};

export default {
  state: readonly(state),

  load,
  reset,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
