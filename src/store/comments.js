import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import $save from '~/helpers/save';
import useToast from '~/composables/useToast';

const toaster = useToast();

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const addComment = (v) => {
  const i = state.raw.findIndex(({ id }) => v?.id == id);
  if (i < 0) {
    state.raw.push(v);
  } else {
    state.raw[i] = v;
  }
};

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
  if (state.pending) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const key = `comments/${model}/${id}`;
  const data = await $({ key, params: { page: state.page } });
  state.raw = state.raw.concat(data?.comments ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const save = async (model, id, description) => {
  const key = `comments/${model}/${id}`;
  const { success } = await $save[key]({ description });
  !success && toaster.danger('Не удалось сохранить комментарий');
  return success;
};

export default {
  state: readonly(state),
  reset,
  load,
  sort,
  fill,
  save,
  addComment,
  count: computed(() => state.raw.length),

};
