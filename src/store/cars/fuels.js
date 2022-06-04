import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  state.raw = await $.fuels();
};

export default {
  state: readonly(state),
  reset,
  load,
  options: computed(() => state.raw.map(({ id, name }) => ({
    value: id,
    label: name,
  }))),
};
