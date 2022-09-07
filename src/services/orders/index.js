import { effectScope, ref, reactive, computed, shallowRef } from 'vue';
import save from '~/helpers/save';
import store from '~/store/orders/orders';
import orderStagesStore from '~/store/orders/stages';
import departmentStore from '~/store/departments';
import { objectSignature } from '~/helpers';
import useToast from '~/composables/useToast';
import tasksStore from '~/store/tasks';

const toaster = useToast();

const { load, state } = store;
const { current } = departmentStore;
const { state: StagesState, load: loadStages } = orderStagesStore;
const { load: loadTasks, reset, state: tasksState } = tasksStore;

let columns;
let filter;
let showModal;

const getKanBanPayload = () => {
  const kanban = state.raw.reduce((payload, curr) => {
    if (curr.stage) {
      const { id, color, name } = curr.stage;

      if (id in payload) payload[id].orders.push(curr);
      else {
        payload[id] = {
          orders: [curr],
          name,
          color,
        };
      }
    }

    return payload;
  }, {});

  StagesState.raw.forEach(({ id, color, name }) => {
    if (id in kanban) return;
    kanban[id] = {
      orders: [],
      name,
      color,
    };
  });

  return kanban;
};

const fillColumns = () => {
  columns.value = getKanBanPayload();
};

const log = async (e, cb) => {
  const d = new Date();
  const { item: { id: order_id }, to: { id: order_stage_id } } = e;

  // eslint-disable-next-line
  const target = state.raw.find(({ id }) => id == order_id);
  // eslint-disable-next-line
  if (target.stage?.id == order_stage_id) return;

  const { message, success } = await save({ data: { order_stage_id }, path: `orders/${order_id}/stage` });

  if (!success) {
    toaster.danger(message ?? 'Что-то пошло не так');
    return fillColumns();
  }

  // Fix : update local ressource
  toaster.success('Стадия заказа успешно обновлена');

  await cb(d, order_id);
};

const atMounted = async () => {
  await Promise.all([async () => reset(), load({ ...filter, department_id: current.value }), loadStages()]).then(fillColumns);
};

export default () => effectScope().run(() => {
  if (!columns) {
    columns = ref({});
    filter = reactive({});
    showModal = shallowRef(false);
  }

  return {
    atMounted,
    columns,
    filter,
    log,
    current,
    tasksState,
    showModal,
    loadTasks,
    sig: computed(() => objectSignature(filter)),
    clearMemo: () => {
      columns = undefined;
      filter = undefined;
    },
    resetFilter: () => {
      filter.client_id = '';
      filter.car_id = '';
      filter.created_before = '';
      filter.created_after = '';
    },
  };
});
