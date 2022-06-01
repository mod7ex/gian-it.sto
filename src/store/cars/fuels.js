import { computed, reactive, readonly } from 'vue';
import { $carFuels } from '~/helpers/fetch.js';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  state.raw = await $carFuels();
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
