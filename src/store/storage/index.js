import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud storages');

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (params = {}) => {
  if (hasCRUD) {
    const key = `storages${params.department_id ? `/department/${params.department_id}` : ''}`;
    state.raw = (await $({ key, params })).storages ?? [];
  }
};

const drop = async (id) => _$.storage(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  storages: computed(() => state.raw.map(({ id, name, city, created_at }) => ({ id, name, city: city?.name, created_at: created_at?.split(' ')[0] }))),
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
