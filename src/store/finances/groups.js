import { reactive, readonly, computed } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud finances');

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.finance_groups();
};

const drop = async (id) => _$.finance_group(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
