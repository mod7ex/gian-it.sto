import { reactive, effectScope } from 'vue';
import useOrder from '~/composables/useOrder.js';
import departmentStore from '~/store/departments';
import store from '~/store/tasks';
import useConfirmDialog from '~/composables/useConfirmDialog';
import useAppRouter from '~/composables/useAppRouter';
import { cleanUp } from '~/helpers';

const { load, sort, fill, reset: resetStore, drop: dropTask, fillArchived } = store;

const { current } = departmentStore;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  status: { label: 'По статусу', sort: (a, b) => (a.status - b.status) },
  user_id: { label: 'По пользователю', sort: (a, b) => (a.user?.id - b.user?.id) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
  // department: { label: 'По отделам', sort: (a, b) => ((b.department?.id ?? 0) - (a.department?.id ?? 0)) },
  // type: { label: 'По типу', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  // sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
};

let filter;
let archived;

const clearMemo = () => { filter = undefined; archived = undefined; };

export default (_archived) => effectScope().run(() => {
  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  // console.log('_archived', _archived);
  // console.log('archived', archived);

  if (_archived != null) {
    archived = _archived;

    // console.log('inside --> _archived', _archived);
    // console.log('inside --> archived', archived);
  }

  if (!filter) {
    filter = reactive({
      name: '',
      status: '',
      user_id: '',
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
  };

  const fetchTasks = async (bool = false, order_id, is_map) => {
    if (order_id) {
      await load({ order_id, is_map, history: 'order' });
      return;
    }

    if (!filter.department_id) return;
    if (bool) resetStore();

    if (archived.value) {
      await fillArchived(cleanUp(filter));
    } else {
      await fill(cleanUp(filter));
    }
  };

  const { drop } = useConfirmDialog();
  const { redirectTo } = useAppRouter();

  const removeTask = (v, redirige = false) => {
    drop(async () => {
      const { success, message } = await dropTask(v);
      try {
        return { success, message };
      } finally {
        success && redirige && await redirectTo({ name: 'Tasks' });
      }
    });
  };

  const edit = async (id) => {
    await redirectTo({ name: 'TaskEdit', params: { id } });
  };

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
