import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $departments } from '~/helpers/fetch.js';

let redirect;
let isEditDepartmentPage;

const { apiRequest } = useApi();

const rawDepartments = ref([]);

const departments = computed(() => rawDepartments.value.map(({ id,
  name,
  city,
  // eslint-disable-next-line camelcase
  created_at }) => ({ id, name, city, created_at })));

const fetchDepartments = async () => { rawDepartments.value = await $departments(); };

/* ************ Delete department ************ */
const deleteDepartment = (id) => {
  rawDepartments.value.splice(
    rawDepartments.value.findIndex((dep) => dep.id === id),
    1,
  );
};

const dropDepartment = async (id) => {
  const { call, errorMsg, success } = apiRequest(`departments/${id}`, { method: 'delete' });

  await call();

  success.value && deleteDepartment(id);

  const deletionMsg = success.value ? 'Department was deleted successfully.' : (errorMsg.value ?? 'Не удалось удалить отделение');

  isEditDepartmentPage.value && await redirect({ name: 'Departments' });

  return { message: deletionMsg, success: success.value };
};

/* ************ To Update department page ************ */
const movetoEditDepartmentPage = async (id) => {
  await redirect({ name: 'EditDepartment', params: { id } });
};

export default function departmentsService() {
  const { redirectTo, isThePage } = useAppRouter('EditDepartment');

  [redirect, isEditDepartmentPage] = [redirectTo, isThePage];

  return {
    rawDepartments,
    fetchDepartments,
    deleteDepartment,
    movetoEditDepartmentPage,
    dropDepartment,
    departments,
  };
}
