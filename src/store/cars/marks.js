import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car marks');

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
  state.raw = await $.car_marks();
};

const fill = async (payload) => {
  if (!hasCRUD) return;
  if (state.page > state.pages) return;
  const data = await $({ key: 'car_marks', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.car_marks ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const drop = async (id) => _$.car_mark(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  fill,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
