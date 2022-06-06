import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  state.raw = await $.roles();
};

const drop = async (id) => _$.role(id, (v) => state.raw.deleteById(v));

export default {
  state: readonly(state),
  load,
  drop,
  reset,
  roles: computed(() => state.raw.map((role) => ({
    id: role.id,
    name: role.title,
    created_at: role.created_at,
  }))),

  options: computed(() => state.raw.map(({ id, title }) => ({
    value: id,
    label: title,
  }))),
};
