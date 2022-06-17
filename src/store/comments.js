import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import $save from '~/helpers/save';

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
});

const sort = (v) => {
  state.raw.sort(v);
};

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (model, id) => {
  const key = `comments/${model}/${id}`;
  state.raw = await $[key]();
};

const fill = async (model, id) => {
  if (state.page > state.pages) return;
  const key = `comments/${model}/${id}`;
  const data = await $({ key, params: { page: state.page } });
  state.raw = state.raw.concat(data?.comments ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const save = async (model, id, description) => {
  const key = `comments/${model}/${id}`;
  await $save[key]({ description });
};

export default {
  state: readonly(state),
  reset,
  load,
  sort,
  fill,
  save,

  count: computed(() => state.raw.length),
};
