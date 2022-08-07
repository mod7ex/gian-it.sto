import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop: dropWrapper } = useConfirmDialog();

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

const fill = async (payload) => {
  if (state.page > state.pages) return;
  const data = await $({ key: 'appeal_reasons', ...payload, page: state.page });
  state.raw = state.raw.concat(data?.appeal_reasons ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const load = async () => {
  state.raw = await $.appeal_reasons();
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
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
