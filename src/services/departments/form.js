import { computed, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $department } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/departments';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const departmentId = ref();
const departmentName = ref();

const isModalUp = ref(false);

const isUpdate = computed(() => !!departmentId.value);

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest();

const setForm = (payload = {}) => {
  departmentName.value = payload.name;
  departmentId.value = payload.id;
};

const setModalVisibility = (bool, id) => {
  isModalUp.value = bool ?? false;

  if (bool) reset();

  setForm({ id });
};

const saveForm = async () => {
  reset();

  await call(`/departments/${departmentId.value ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: { name: departmentName.value },
  });

  if (!success.value) return false;

  await load();

  setModalVisibility(false);

  return toaster.success('Отдел успешно сохранен');
};

const atMountedDepartmentForm = async () => {
  const id = departmentId.value;

  let dep = {};
  if (id) dep = await $department(id);

  setForm(dep);
};

export default function () {
  return {
    data,
    saveForm,
    responce,
    error,
    loading,
    errorMsg,
    success,
    ready,
    isModalUp,
    departmentName,
    setModalVisibility,
    atMountedDepartmentForm,
    isUpdate,
  };
}
