import { reactive, effectScope } from 'vue';
import useOrder from '~/composables/useOrder.js';
import departmentStore from '~/store/departments';
import store from '~/store/tasks';
import useConfirmDialog from '~/composables/useConfirmDialog';
import useAppRouter from '~/composables/useAppRouter';
import { cleanUp } from '~/helpers';

const { current } = departmentStore;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  // name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => ((b.department?.id ?? 0) - (a.department?.id ?? 0)) },
  // type: { label: 'По типу', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  // sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
  // date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

let filter;

const clearMemo = () => { filter = undefined; };

export default () => effectScope().run(() => {
  const { sort, fill, reset: resetStore, drop: dropTask } = store;

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  const { reset, trigger } = order;

  if (!filter) {
    filter = reactive({
      name: '',
      status: '',
      author_id: '',
      // user_id: '',
      order_id: '',
      pipeline_id: '',
      department_id: current,
    });
  }

  const resetFilter = () => {
    Object.keys(filter).forEach((key) => {
      if (key !== 'department_id') {
        filter[key] = '';
      }
    });

    reset(true);
  };

  const fetchTasks = async (bool = false) => {
    if (!filter.department_id) return;
    if (bool) resetStore();
    await fill(cleanUp(filter));
    trigger();
  };

  const { drop } = useConfirmDialog();
  const { redirectTo } = useAppRouter();

  const removeTask = (v, redirige = false) => {
    drop(async () => {
      const { success, message } = await dropTask(v);
      try {
        return { success, message };
      } finally {
        // success && redirige && await redirectTo({ name: 'Tasks' });
      }
    });
  };

  const edit = async (id) => {
    await redirectTo({ name: 'TaskEdit', params: { id } });
  };

  // onScopeDispose(() => { filter = undefined; }); // not here

  return {
    order,
    filter,
    removeTask,
    edit,
    resetFilter,
    fetchTasks,
    current,
    clearMemo,
  };
});
