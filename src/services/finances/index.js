import { reactive, onScopeDispose } from 'vue';
import useOrder from '~/composables/useOrder.js';
// import departmentStore from '~/store/departments';
import store from '~/store/finances/finances';

// const { current } = departmentStore;

const { sort, fill, reset: resetStore } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => ((b.department?.id ?? 0) - (a.department?.id ?? 0)) },
  type: { label: 'По типу', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

let filter;

export default function () {
  if (!filter) {
    filter = reactive({
      name: '',
      type: '',
      sum: '',
      // department_id: current,
      start_date: '',
      end_date: '',
      order: '',
    });
  }

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  // const { reset } = order;

  const resetFilter = () => {
    Object.keys(filter).forEach((key) => {
      if (key !== 'department_id') { filter[key] = ''; }
    });

    // reset(true);
  };

  const fetchFinances = async (bool = false) => {
    if (bool) resetStore();
    await fill(filter);
    // trigger();
  };

  return {
    order,
    filter,
    resetFilter,
    fetchFinances,
    cleanUp: () => onScopeDispose(() => {
      filter = undefined;
    }),
  };
}
