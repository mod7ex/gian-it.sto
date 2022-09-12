import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud storages');

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

const load = async (params = {}) => {
  if (hasCRUD) {
    const key = `storages${params.department_id ? `/department/${params.department_id}` : ''}`;
    state.raw = (await $({ key, params })).storages ?? [];
  }
};

const fill = async (payload) => {
  if (state.pending) return;
  if (!hasCRUD) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const key = `storages${payload.department_id ? `/department/${payload.department_id}` : ''}`;
  const data = await $({ key, params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.storages ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const drop = async (id) => _$.storage(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  fill,
  load,
  add,
  drop,
  reset,
  storages: computed(() => state.raw.map(({ id, name, city, created_at }) => ({ id, name, city: city?.name, created_at: created_at?.split(' ')[0] }))),
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
