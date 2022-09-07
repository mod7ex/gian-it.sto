import { effectScope, ref, reactive, computed } from 'vue';
import save from '~/helpers/save';
import store from '~/store/orders/orders';
import orderStagesStore from '~/store/orders/stages';
import departmentStore from '~/store/departments';
import { objectSignature } from '~/helpers';
import useToast from '~/composables/useToast';

const toaster = useToast();

const { load, state } = store;
const { current } = departmentStore;
const { state: StagesState, load: loadStages } = orderStagesStore;

let columns;
let filter;

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

const log = async (e) => {
  const { item: { id: orderId }, to: { id: order_stage_id } } = e;

  // eslint-disable-next-line
  const target = state.raw.find(({ id }) => id == orderId);
  // eslint-disable-next-line
  if (target.stage?.id == order_stage_id) return;

  const { message, success } = await save({ data: { order_stage_id }, path: `orders/${orderId}/stage` });

  if (!success) {
    toaster.danger(message ?? 'Что-то пошло не так');
    return fillColumns();
  }

  // Fix : update local ressource
  return toaster.success('Стадия заказа успешно обновлена');
};

const atMounted = async () => {
  await Promise.all([load({ ...filter, department_id: current.value }), loadStages()]).then(fillColumns);
};

export default () => effectScope().run(() => {
  if (!columns) {
    columns = ref({});
    filter = reactive({});
  }

  return {
    atMounted,
    columns,
    filter,
    log,
    current,
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
