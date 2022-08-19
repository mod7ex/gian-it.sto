import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import useAuth from '~/composables/useAuth';
import { PERMISSIONS } from '~/lib/permissions.js';

const { userDepartment, user } = useAuth();

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

const load = async (payload = {}) => {
  if (!PERMISSIONS.TASKS.READ()) return;
  state.raw = await $.tasks(payload);
};

const fill = async (payload = {}) => {
  if (state.pending) return;
  if (!PERMISSIONS.TASKS.READ()) return;
  if (state.page > state.pages) return;

  if (PERMISSIONS.TASKS.READ_DEPARTMENT()) {
    if (payload.department_id != userDepartment.value) return;
  }

  state.pending = true;
  const data = await $({ key: 'tasks', params: { ...payload, page: state.page } });
  if (PERMISSIONS.TASKS.READ_OWN()) {
    const only_my_tasks = data?.tasks?.filter(({ author: { id } }) => id === user.value.id);
    state.raw = state.raw.concat(only_my_tasks ?? []);
  } else {
    state.raw = state.raw.concat(data?.tasks ?? []);
  }
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
};

const sort = (v) => {
  state.raw.sort(v);
};

const drop = async (id) => _$.task(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  sort,
  fill,
  no_owner: computed(() => state.raw.filter(({ user: responsible }) => !responsible).map(({ id }) => id)),
  options: computed(() => state.raw.map(({ id: value, name: label }) => ({ label, value }))),
  map_options: computed(() => state.raw.filter(({ is_map }) => is_map).map(({ id: value, name: label }) => ({ label, value }))),
};
