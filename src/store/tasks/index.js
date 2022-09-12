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

const setTaskFunnelStage = (task_id, funnel_id, stage) => {
  const task_index = state.raw.findIndex(({ id }) => id == task_id);

  if (task_index < 0) return;

  const funnels = state.raw[task_index].pipelines;

  if (!funnels) return;

  const funnel_index = funnels.findIndex(({ pipeline: { id } }) => id == funnel_id);

  if (funnel_index < 0) return;

  state.raw[task_index].pipelines[funnel_index].stage = { ...stage };
};

const getTaskById = (_id) => state.raw.find(({ id }) => _id == id);

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

const getMine = async (payload = {}) => {
  const me = user.value?.id;
  if (!me) return;
  if (state.pending) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'tasks-own', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.tasks ?? []);
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

const tasksInFunnel = (_id) => state.raw.filter(({ pipelines }) => (pipelines.some(({ pipeline: { id } }) => id == _id)));

export default {
  state: readonly(state),
  findTask,
  load,
  drop,
  setTaskFunnelStage,
  reset,
  sort,
  fill,
  getMine,
  setTask,
  getTaskById,
  tasksInFunnel,
  options: computed(() => state.raw.map(({ id: value, name: label }) => ({ label, value }))),
  map_options: computed(() => state.raw.filter(({ is_map }) => is_map).map(({ id: value, name: label }) => ({ label, value }))),
};
