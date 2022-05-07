import useVuelidate from '@vuelidate/core';
import { reactive, ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import departmentFormRules from '~/validationsRules/departmentForm.js';
import { $cities, $department } from '~/helpers/fetch.js';

import departmentsService from './departments';

const { fetchDepartments } = departmentsService();

const { apiRequest } = useApi();

const rawCities = ref([]);
const cities = computed(() => rawCities.value.map(({ id, name }) => ({ value: id, label: name })));

const department = reactive({
  name: null,
  city: null,
});

const departmentId = ref();

const { rules } = departmentFormRules();
const v$ = useVuelidate(rules, department, { $lazy: true });

const isModalUp = ref(false);

const isUpdate = ref();

const setForm = async (payload) => {
  department.name = payload?.name;
  department.city = payload?.city;
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

  rawCities.value = await $cities();
};

export default function profileChangePasswordHandler() {
  return {
    v$,
    data,
    save,
    responce,
    cities,
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
