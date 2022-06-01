import { watch } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/clients';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { sort, load, state } = store;

const DEFAULT_ORDER_CRITERIA = 'surname';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); });

/* ************ Fetch client ************ */

const fetchClients = async (name) => {
  if (state.loading || !current.value) return;

  order.active.value = false;

  await load({ order: order.criteria.value, name, department_id: current.value });

  order.reset();
};

export default function () {
  watch(current, async () => { await fetchClients(); }, { immediate: true });

  return {
    order,
    fetchClients,
  };
}
