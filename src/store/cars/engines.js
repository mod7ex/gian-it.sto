import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  state.raw = await $.engine_volumes();
};

export default {
  state: readonly(state),
  reset,
  load,
  options: computed(() => state.raw.map(({ id, value }) => ({
    value: id,
    label: value,
  }))),
};
