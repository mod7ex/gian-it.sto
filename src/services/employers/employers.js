import { watch } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/employees.js';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { load, sort, state } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

export const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); });

/* ************ Fetch employer ************ */

export const fetchEmployers = async (name) => {
  if (state.loading || !current.value) return;

  order.active.value = false;

  await load({ order: order.criteria.value, name, department_id: current.value });

  order.trigger();
};

export default function () {
  watch(current, async () => { await fetchEmployers(); }, { immediate: true });

  return {
    order,
    fetchEmployers,
  };
}
