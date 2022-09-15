import { reactive, readonly, computed } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { generateShapedIdfromId } from '~/helpers';
import { userHasAtLeastOnePermission } from '~/lib/permissions';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const setOrderStage = (order_id, stage) => {
  for (let i = 0; i < state.raw.length; i++) {
    if (state.raw[i].id == order_id) {
      state.raw[i].stage = { ...stage };
      return;
    }
  }
};

const load = async (payload) => {
  if (userHasAtLeastOnePermission(['crud orders', 'read orders'])) {
    if (!payload?.department_id) return;
    state.raw = await $.orders(payload);
  }
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  setOrderStage,
  options: computed(() => state.raw.map(({ id }) => ({ label: `#${generateShapedIdfromId(id)}`, value: id }))),
};
