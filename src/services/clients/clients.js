import { reactive, effectScope, onScopeDispose } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/clients';
import departmentStore from '~/store/departments';
import useAppRouter from '~/composables/useAppRouter';

const { current } = departmentStore;

const { sort, fill, reset: resetStore } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  surname: { label: 'По фамилии', sort: (a, b) => (a.surname > b.surname ? 1 : (a.surname < b.surname ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => (a.department?.id - b.department?.id) },
};

let filter;

export default () => effectScope().run(() => {
  const { redirectTo } = useAppRouter();
  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); });

  const { reset } = order;

  const resetFilter = () => {
    Object.keys(filter).forEach((key) => {
      if (key !== 'department_id') {
        filter[key] = '';
      }
    });

    reset(true);
  };

  /* ************ Fetch client ************ */
  const fetchClients = async (bool = false) => {
    if (!filter.department_id) return;
    if (bool) resetStore();
    await fill(filter);
    // trigger();
  };

  if (!filter) {
    filter = reactive({
      name: '',
      search: '',
      number: '',
      department_id: current,
      order: 'id',
    });
  }

  const edit = async (id) => {
    await redirectTo({ name: 'EditClient', params: { id } });
  };

  return {
    order,
    filter,
    fetchClients,
    resetFilter,
    edit,
    cleanUp: () => onScopeDispose(() => {
      filter = undefined;
    }),
  };
});
