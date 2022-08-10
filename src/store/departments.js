import { computed, reactive, readonly, ref } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { userHasPermission } from '~/lib/permissions.js';
import useAuth from '~/composables/useAuth.js';

const { userDepartment } = useAuth();
const LOCAL_STORAGE_DEPARTMENT = 'department';
const hasCRUD = userHasPermission('crud departments');

const state = reactive({
  raw: [],
});

const current = ref();

const setCurrent = (id, work = false) => {
  const curr = work ? userDepartment.value : (id ?? localStorage.getItem(LOCAL_STORAGE_DEPARTMENT) ?? userDepartment.value);
  current.value = Number(curr);
  localStorage.setItem(LOCAL_STORAGE_DEPARTMENT, `${curr}`);
};

const reset = () => {
  state.raw = [];
};

const load = async (payload = {}) => {
  if (hasCRUD) {
    state.raw = await $.departments(payload);
  }
};

const remove = (id) => {
  if (current.value === `${id}`) {
    localStorage.removeItem(LOCAL_STORAGE_DEPARTMENT);
    setCurrent();
  }

  state.raw.deleteById(id);
};

const drop = async (id) => _$.department(id, remove);

const isCurrent = (id) => id === current.value;

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  setCurrent,
  current,
  departments: computed(() => state.raw.map(({ id, name }) => ({ id, name }))),
  links: computed(() => state.raw.map(({ id, name }) => ({ label: name, id, current: isCurrent(id) }))),
  options: computed(() => state.raw.map(({ id, name }) => ({ value: id, label: name }))),
};
