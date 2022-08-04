import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car models');

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
});

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.car_models();
};

const fill = async (payload) => {
  if (!hasCRUD) return;
  if (state.page > state.pages) return;
  const data = await $({ key: 'car_models', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.car_models ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
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
  fill,
  getMarkModels,
};
