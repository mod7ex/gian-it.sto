import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useAuth from '~/composables/useAuth.js';
import { $departments } from '~/helpers/fetch.js';

import { userHasPermission } from '~/lib/permissions.js';

const LOCAL_STORAGE_DEPARTMENT = 'department';

const hasCRUD = userHasPermission('crud departments');

let redirect;

const { apiRequest } = useApi();

const rawDepartments = ref([]);

const departments = computed(() => rawDepartments.value.map(({ id, name }) => ({ id, name })));

const fetchDepartments = async () => {
  if (!hasCRUD) return;
  rawDepartments.value = await $departments();
};

/* ************ App Current Department ************ */
const { userDepartment } = useAuth();
const currentDepartment = ref();

const setCurrentDepartment = (id) => {
  const currentDepartmentId = id ?? localStorage.getItem(LOCAL_STORAGE_DEPARTMENT) ?? userDepartment.value;
  localStorage.setItem(LOCAL_STORAGE_DEPARTMENT, `${currentDepartmentId}`);
  currentDepartment.value = Number(currentDepartmentId);
};

const isCurrentDepartment = (id) => id === currentDepartment.value;

/* ************ Delete department ************ */
const deleteDepartment = (id) => {
  if (localStorage.getItem(LOCAL_STORAGE_DEPARTMENT) === `${id}`) {
    localStorage.removeItem(LOCAL_STORAGE_DEPARTMENT);
    setCurrentDepartment();
  }

  rawDepartments.value.deleteById(id);
};

const dropDepartment = async (id) => {
  const { call, errorMsg, success } = apiRequest(`departments/${id}`, { method: 'delete' });

  await call();

  success.value && deleteDepartment(id);

  const deletionMsg = success.value ? 'Отдел успешно удален' : (errorMsg.value ?? 'Не удалось удалить отделение !');

  return { message: deletionMsg, success: success.value };
};

/* ************ To Update department page ************ */
const movetoEditDepartmentPage = async (id) => {
  await redirect({ name: 'EditDepartment', params: { id } });
};

export default function departmentsService() {
  const { redirectTo } = useAppRouter();

  redirect = redirectTo;

  return {
    rawDepartments,
    fetchDepartments,
    movetoEditDepartmentPage,
    dropDepartment,
    departments,
    hasCRUD,
    currentDepartment,
    setCurrentDepartment,
    isCurrentDepartment,
  };
}
