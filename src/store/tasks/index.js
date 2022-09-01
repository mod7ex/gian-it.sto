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

const setTask = (payload) => {
  const i = state.raw.findIndex(({ id }) => id === payload.id);
  if (i < 0) return;
  state.raw[i] = payload;
};

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (payload = {}, trackPermissions = true) => {
  if (state.pending) return;

  if (trackPermissions && PERMISSIONS.TASKS.READ_DEPARTMENT()) { // ==> department PERMISSION
    if (payload.department_id != userDepartment.value) return;
  }

  state.pending = true;
  const data = await $.tasks(payload);
  state.pending = false;

  if (trackPermissions && PERMISSIONS.TASKS.READ_OWN()) { // ==> Only_My PERMISSION
    const only_my_tasks = data?.filter(({ author: { id } }) => id === user.value.id) ?? [];
    state.raw = only_my_tasks;
  } else {
    state.raw = data ?? [];
  }
};

const fill = async (payload = {}, trackPermissions = true) => {
  if (state.pending) return;
  if (state.page > state.pages) return;

  if (trackPermissions && PERMISSIONS.TASKS.READ_DEPARTMENT()) { // ==> department PERMISSION
    if (payload.department_id != userDepartment.value) return;
  }

  state.pending = true;
  const data = await $({ key: 'tasks', params: { ...payload, page: state.page } });
  if (trackPermissions && PERMISSIONS.TASKS.READ_OWN()) { // ==> Only_My PERMISSION
    const only_my_tasks = data?.tasks?.filter(({ author: { id }, user: { id: u_id } }) => (id == user.value.id || u_id === user.value.id)); // Tasks i created or tasks where i'm the executer
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

const findTask = (_id) => state.raw.find(({ id }) => id == _id);

export default {
  state: readonly(state),

  findTask,
  load,
  drop,
  reset,
  sort,
  fill,
  setTask,
  // noOwnerTask: computed(() => (state.raw[0])),
  noOwnerTask: computed(() => (state.raw.filter(({ user: responsible }) => !responsible))[0]),
  options: computed(() => state.raw.map(({ id: value, name: label }) => ({ label, value }))),
  map_options: computed(() => state.raw.filter(({ is_map }) => is_map).map(({ id: value, name: label }) => ({ label, value }))),
};
