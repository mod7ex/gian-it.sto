import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $departments } from '~/helpers/fetch.js';
import { maybeRun } from '~/helpers';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud departments');

let redirect;
let isEditDepartmentPage;

const { apiRequest } = useApi();

const rawDepartments = ref([]);

// eslint-disable-next-line camelcase
const departments = computed(() => rawDepartments.value.map(({ id, name, city, created_at }) => ({ id, name, city, created_at })));

const departmentsLinks = computed(() => rawDepartments.value.map(({ id, name }) => ({ href: { name: 'Employers', query: { department_id: id, name } }, label: name })));

const fetchDepartments = maybeRun(async () => {
  rawDepartments.value = await $departments();
}, hasCRUD);

/* ************ Delete department ************ */
const deleteDepartment = (id) => {
  rawDepartments.value.splice(
    rawDepartments.value.findIndex((dep) => dep.id === id),
    1,
  );
};

const dropDepartment = maybeRun(async (id) => {
  const { call, errorMsg, success } = apiRequest(`departments/${id}`, { method: 'delete' });

  await call();

  success.value && deleteDepartment(id);

  const deletionMsg = success.value ? 'Department was deleted successfully.' : (errorMsg.value ?? 'Не удалось удалить отделение');

  isEditDepartmentPage.value && await redirect({ name: 'Departments' });

  return { message: deletionMsg, success: success.value };
}, hasCRUD);

/* ************ To Update department page ************ */
const movetoEditDepartmentPage = maybeRun(async (id) => {
  await redirect({ name: 'EditDepartment', params: { id } });
}, hasCRUD);

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
    departmentsLinks,
    hasCRUDdepartments: hasCRUD,
  };
}
