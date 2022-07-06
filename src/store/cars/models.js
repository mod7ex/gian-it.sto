import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car models');

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.car_models();
};

const drop = async (id) => _$.car_model(id, (v) => {
  state.raw.deleteById(v);
});

const getMarkModels = (markId) => {
  if (markId) {
    return state.raw.filter(({ car_mark }) => car_mark?.id === Number(markId));
  }
  return state.raw; // might change later maybe we shouldn't show models excepr if user has selected a mark
};

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  getMarkModels,
};
