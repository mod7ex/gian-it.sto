import { reactive } from 'vue';
import useOrder from '~/composables/useOrder.js';
// import departmentStore from '~/store/departments';
import store from '~/store/finances/finances';

// const { current } = departmentStore;

const { sort, fill, reset: resetStore } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
  type: { label: 'По Типe', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

const { reset, trigger } = order;

export const filter = reactive({
  name: '',
  type: '',
  sum: '',
  // department_id: current,
  start_date: '',
  end_date: '',
});

export const resetFilter = () => {
  Object.keys(filter).forEach((key) => {
    if (key !== 'department_id') {
      filter[key] = '';
    }
  });

  reset(true);
};

const fetchFinances = async (bool = false) => {
  if (bool) resetStore();
  await fill(filter);
  trigger();
};

export default function () {
  return {
    order,
    filter,
    resetFilter,
    fetchFinances,
  };
}
