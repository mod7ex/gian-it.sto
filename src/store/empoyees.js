import { reactive, readonly } from 'vue';

const state = reactive({
  employees: [],
});

const reset = () => {
  state.employees = [];
};

export default {
  state: readonly(state),
  reset,
};
