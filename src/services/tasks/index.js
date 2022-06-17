import { reactive } from 'vue';
import useOrder from '~/composables/useOrder.js';
// import departmentStore from '~/store/departments';
import store from '~/store/tasks';
import useConfirmDialog from '~/composables/useConfirmDialog';
import useAppRouter from '~/composables/useAppRouter';

// const { current } = departmentStore;

const { sort, fill, reset: resetStore, drop: dropTask } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  // name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  // department: { label: 'По отделам', sort: (a, b) => ((b.department?.id ?? 0) - (a.department?.id ?? 0)) },
  // type: { label: 'По типу', sort: (a, b) => (a.operation_type > b.operation_type ? 1 : (a.operation_type < b.operation_type ? -1 : 0)) },
  // sum: { label: 'По сумме', sort: (a, b) => (a.sum - b.sum) },
  // date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

const { reset, trigger } = order;

export const filter = reactive({
  name: '',
  status: '',
  user_id: '',
  order_id: '',
  pipeline_id: '',
  // department_id: current,
});

export const resetFilter = () => {
  Object.keys(filter).forEach((key) => {
    if (key !== 'department_id') {
      filter[key] = '';
    }
  });

  reset(true);
};

const fetchTasks = async (bool = false) => {
  if (bool) resetStore();
  await fill(filter);
  trigger();
};

export default function () {
  const { drop } = useConfirmDialog();
  const { redirectTo } = useAppRouter();

  const removeTask = (v) => drop(() => dropTask(v));

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
  };
}
