import { effectScope, ref, reactive, computed, shallowRef } from 'vue';
import save from '~/helpers/save';
import store from '~/store/orders/orders';
import orderStagesStore from '~/store/orders/stages';
import departmentStore from '~/store/departments';
import { objectSignature } from '~/helpers';
import useToast from '~/composables/useToast';
import tasksStore from '~/store/tasks';

const toaster = useToast();

const { load, state, setOrderStage } = store;
const { current } = departmentStore;
const { state: stagesState, load: loadStages } = orderStagesStore;
const { load: loadTasks, reset, state: tasksState, getTaskById } = tasksStore;

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

  stagesState.raw.forEach(({ id, color, name }) => {
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

  const target_stage = state.raw.find(({ id }) => id == order_id)?.stage?.id;
  if (target_stage == order_stage_id) return;

  const { message, success } = await save({ data: { order_stage_id }, path: `orders/${order_id}/stage` });

  if (!success) {
    toaster.danger(message ?? 'Что-то пошло не так');
    return fillColumns();
  }

  setOrderStage(order_id, stagesState.raw.find(({ id }) => id == order_stage_id));

  toaster.success('Стадия заказа успешно обновлена');

  await cb(d, order_id);
};

const atMounted = async () => {
  await Promise.all([async () => reset(), load({ ...filter, department_id: current.value, history: 'order' }), loadStages()]).then(fillColumns);
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
    toaster,
    current,
    tasksState,
    showModal,
    loadTasks,
    getTaskById,
    state,
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
