import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions';

const hasCrud = userHasPermission('crud processes');

const state = reactive({
  raw: [],
  preview: undefined,
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCrud) return;
  state.raw = await $.maps();
};

const drop = async (id) => _$.map(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  options: computed(() => state.raw.map(({ id, title }) => ({
    value: id,
    label: title,
  }))),
};
