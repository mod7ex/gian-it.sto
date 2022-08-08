import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const fill = async (payload) => {
  if (state.pending) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'process_tasks', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.process_tasks ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const load = async (process_category_id) => {
  state.raw = await $.process_tasks({ process_category_id });
};

const drop = async (id) => _$.process_task(id, (v) => { state.raw.deleteById(v); });

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  fill,
  options: computed(() => state.raw.map(({ id, name }) => ({
    value: id,
    label: name,
  }))),
};
