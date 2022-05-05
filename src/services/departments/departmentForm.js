import useVuelidate from '@vuelidate/core';
import { reactive, ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import departmentFormRules from '~/validationsRules/departmentForm.js';
import { $cities, $department } from '~/helpers/fetch.js';
import departmentsService from './departments';

const { fetchDepartments } = departmentsService();

const toaster = useToast();

const { apiRequest } = useApi();

let routeInstance;
let isEditDepartmentPage;
let redirect;

const department = reactive({
  name: null,
  city: null,
});

const rawCities = ref([]);
const cities = computed(() => rawCities.value.map(({ id, name }) => ({ value: id, label: name })));
/* ************ Department (create & update) ************ */

const { rules } = departmentFormRules();
const v$ = useVuelidate(rules, department, { $lazy: true });

const saveDepartment = async () => {
  const isValideDepartmentName = await v$.value.$validate();

  if (!isValideDepartmentName) return;

  v$.value.$reset();

  const { call, data, errorMsg, success } = apiRequest(`/departments/${isEditDepartmentPage.value ? routeInstance.params.id : ''}`, {
    method: isEditDepartmentPage.value ? 'put' : 'post',
    data: department,
  });

  await call();

  if (!success.value) return toaster.danger(errorMsg.value ?? 'Something went wrong!');

  if (!isEditDepartmentPage.value) {
    await fetchDepartments();
    // we can just add the department to the rawDepartments but
    // there might be other departments created at the same time by other user
    // so it's rather a good choice to re-fetch them
    await redirect({ name: 'EditDepartment', params: { id: data.value?.department?.id } });
  }

  return toaster.success('Department saved.');
};

/* ************ Department Raw Permissions ************ */

const setDepartmentForm = async (payload) => {
  department.name = payload?.name;
  department.city = payload?.city;
};

const atMountedDepartmentForm = async () => {
  const dep = (isEditDepartmentPage.value && routeInstance.params.id) && await $department(routeInstance.params.id);

  await setDepartmentForm(dep || {});

  rawCities.value = await $cities();
};

export default function departmentFormService() {
  const { route, isThePage, redirectTo } = useAppRouter('EditDepartment');

  [routeInstance, isEditDepartmentPage, redirect] = [route, isThePage, redirectTo];

  return {
    department,
    cities,
    v$,
    saveDepartment,
    setDepartmentForm,
    atMountedDepartmentForm,
    isEditDepartmentPage,
  };
}
