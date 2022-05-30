import { reactive, ref, watch } from 'vue';
import useApi from '~/composables/useApi.js';
import useOrder from '~/composables/useOrder.js';
import { $finances } from '~/helpers/fetch.js';
// import departments from '~/services/departments/departments';
import { debounce } from '~/helpers';

// const { currentDepartment } = departments();

const { apiRequest } = useApi();

const DEFAULT_ORDER_CRITERIA = 'id';
const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
  type: { label: 'По Типe', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

const finances = ref([]);

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { finances.value.sort(v); });

const { criteria } = order;

const filter = reactive({
  name: '',
  type: '',
  sum: '',
  order: criteria,
  // department_id: currentDepartment, // departments should be fixed in backend
  start_date: '',
  end_date: '',
});

const filterSignature = ref('');

watch(filter, debounce(() => {
  filterSignature.value = Object.keys(filter).reduce((prev, curr) => {
    if (curr === 'order') return prev; // don't fetch on re-order
    return prev + filter[curr];
  }, '');
}), { deep: true });

/* ************ Delete finance ************ */

const dropFinance = async (id) => {
  const { call, errorMsg, success } = apiRequest(`finances/${id}`, { method: 'delete' });

  await call();

  success.value && finances.value.deleteById(id);

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

  loading.value = false;
};

export default function () {
  return {
    order,
    finances,
    dropFinance,
    fetchFinances,
    loading,
    filter,
    filterSignature,
  };
}
