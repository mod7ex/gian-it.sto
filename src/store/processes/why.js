import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop: dropWrapper } = useConfirmDialog();

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
  pending: false,
});

const add = (v) => {
  const i = state.raw.findIndex(({ id }) => v?.id == id);
  if (i < 0) {
    state.raw.push(v);
  } else {
    state.raw[i] = v;
  }
};

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const fill = async (payload) => {
  if (state.pending) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'appeal_reasons', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.appeal_reasons ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const load = async (payload) => {
  state.raw = await $.appeal_reasons(payload);
};

const drop = (id) => dropWrapper(async () => _$.appeal_reason(id, (v) => {
  state.raw.deleteById(v);
}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  fill,
  add,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
