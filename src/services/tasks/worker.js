import { reactive, effectScope, onScopeDispose } from 'vue';
import useOrder from '~/composables/useOrder.js';
import departmentStore from '~/store/departments';
import store from '~/store/tasks';
import { cleanUp } from '~/helpers';
import useAuth from '~/composables/useAuth';

const { sort, fill, reset: resetStore, state } = store;
const { user } = useAuth();

const { current } = departmentStore;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

let filter;

const clearMemo = () => onScopeDispose(() => { filter = undefined; });

export default () => effectScope().run(() => {
  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  if (!filter) {
    filter = reactive({
      name: '',
      status: '',
      order_id: '',
      order: '',
    });
  }

  const resetFilter = () => {
    Object.keys(filter).forEach((key) => {
      filter[key] = '';
    });
  };

  const fetchTasks = async (bool = false) => {
    if (bool) resetStore();
    await fill({ user_id: user.value.id, ...cleanUp(filter) });
  };

  return {
    order,
    filter,
    resetFilter,
    fetchTasks,
    current,
    clearMemo,
    state,
  };
});
