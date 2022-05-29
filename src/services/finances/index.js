import { reactive, ref, watch } from 'vue';
import useApi from '~/composables/useApi.js';
import useOrder from '~/composables/useOrder.js';
import { $finances } from '~/helpers/fetch.js';
import departments from '~/services/departments/departments';

const { currentDepartment } = departments();

const { apiRequest } = useApi();

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

const finances = ref([]);

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { finances.value.sort(v); });

const filter = reactive({
  name: undefined,
  type: undefined,
  sum: undefined,
  order: order.criteria,
  department_id: currentDepartment,
  start_date: undefined, // 01/31/2022
  end_date: undefined, // 01/31/2022
});

/* ************ Delete finance ************ */
const deleteFinance = (financeId) => !!finances.value.splice(
  finances.value.findIndex(({ id }) => id === financeId),
  1,
).length;

const dropFinance = async (id) => {
  const { call, errorMsg, success } = apiRequest(`finances/${id}`, { method: 'delete' });

  await call();

  success.value && deleteFinance(id);

  const deletionMsg = success.value ? 'Сотрудник успешно удален' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: success.value };
};

/* ************ Fetch finances ************ */
const loading = ref(false);

const fetchFinances = async () => {
  if (loading.value) return;

  loading.value = true;

  order.active.value = false;

  finances.value = await $finances(filter);

  order.reset();

  loading.value = false;
};

export default function () {
  watch(currentDepartment, async () => {
    await fetchFinances();
  });

  return {
    order,
    finances,
    deleteFinance,
    dropFinance,
    fetchFinances,
    loading,
    filter,
  };
}
