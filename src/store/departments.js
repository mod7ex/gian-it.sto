import { computed, reactive, readonly, ref } from 'vue';
import { $departments } from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';
import { userHasPermission } from '~/lib/permissions.js';
import useAuth from '~/composables/useAuth.js';

const { userDepartment } = useAuth();
const LOCAL_STORAGE_DEPARTMENT = 'department';
const hasCRUD = userHasPermission('crud departments');

const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const current = ref();

const setCurrent = (id) => {
  if (hasCRUD) {
    const curr = id ?? localStorage.getItem(LOCAL_STORAGE_DEPARTMENT) ?? userDepartment.value;
    current.value = Number(curr);
    localStorage.setItem(LOCAL_STORAGE_DEPARTMENT, `${curr}`);
  }
};

const reset = () => {
  state.raw = [];
};

const load = async (payload = {}) => {
  if (hasCRUD) {
    state.raw = await $departments(payload);
  }
};

const remove = (id) => {
  if (current.value === `${id}`) {
    localStorage.removeItem(LOCAL_STORAGE_DEPARTMENT);
    setCurrent();
  }

  state.raw.deleteById(id);
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`departments/${id}`, { method: 'delete' });

  await call();

  success.value && remove(id);

  const deletionMsg = success.value ? 'Отдел успешно удален' : (errorMsg.value ?? 'Не удалось удалить отделение !');

  return { message: deletionMsg, success: success.value };
};

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
