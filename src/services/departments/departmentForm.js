import useVuelidate from '@vuelidate/core';
import { reactive, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import departmentFormRules from '~/validationsRules/departmentForm.js';
import { $department } from '~/helpers/fetch.js';

import departmentsService from './departments';

const { fetchDepartments } = departmentsService();

const { apiRequest } = useApi();

const department = reactive({
  name: null,
});

const departmentId = ref();

const { rules } = departmentFormRules();
const v$ = useVuelidate(rules, department, { $lazy: true });

const isModalUp = ref(false);

const isUpdate = ref();

const setForm = async (payload) => {
  // Reflect.ownKeys(department).forEach((key) => Reflect.set(department, key, Reflect.get(payload ?? {}, key)));
  department.name = payload?.name;
};

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest(`/departments/${departmentId.value ?? ''}`, {
  method: departmentId.value ? 'put' : 'post',
  data: department,
});

const setModalVisibility = (bool, dId) => {
  isModalUp.value = bool ?? !isModalUp.value;
  reset();
  v$.value.$reset();
  setForm();
  departmentId.value = dId;
};

const save = async () => {
  reset();

  v$.value.$touch();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  await call();

  if (!success.value) return false;

  await fetchDepartments();

  return true;
};

const atMountedDepartmentForm = async () => {
  const dep = !!departmentId.value && await $department(departmentId.value);

  await setForm(dep || {});

  isUpdate.value = !!(dep || false);
};

export default function profileChangePasswordHandler() {
  return {
    v$,
    data,
    save,
    responce,
    error,
    loading,
    errorMsg,
    success,
    ready,
    isModalUp,
    department,
    setModalVisibility,
    atMountedDepartmentForm,
    isUpdate,
  };
}
