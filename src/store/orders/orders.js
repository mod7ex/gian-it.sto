import { reactive, readonly, computed } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { generateShapedIdfromId } from '~/helpers';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (payload) => {
  state.raw = (await $({ key: `orders/department/${payload.department_id}` })).orders ?? [];
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  options: computed(() => state.raw.map(({ id }) => ({ label: generateShapedIdfromId(id), value: id }))),
};
