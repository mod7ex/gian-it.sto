import { effectScope, onScopeDispose, ref, reactive, computed } from 'vue';
import store from '~/store/orders';
import stageStore from '~/store/pipelines/stages';
import departmentStore from '~/store/departments';
import save from '~/helpers/save';
import { objectSignature } from '~/helpers';
import useToast from '~/composables/useToast';

const toaster = useToast();
const { load, state } = store;
const { current } = departmentStore;
const { state: stageState, load_orders_stages } = stageStore;

let columns;

const filter = reactive({
  type: '',
  user_id: '',
  created_after: '',
  created_before: '',
});

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

  stageState.raw.forEach(({ id, color, name }) => {
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
  const { item: { id: orderId }, to: { id: stage_id } } = e;

  const { message, success } = await save({ data: { stage_id }, path: `orders/${orderId}/pipelines/${stageState.pipeline}/stage` });

  if (!success) {
    fillColumns();
    return toaster.danger(message ?? 'Что-то пошло не так');
  }

  return toaster.success('Стадия заказа успешно обновлена');
};

const atMounted = async () => {
  await Promise.all([load({ department_id: current.value }), load_orders_stages()]).then(fillColumns);
};

export default () => effectScope().run(() => {
  if (!columns) {
    columns = ref({});
  }

  onScopeDispose(() => {
    columns = undefined;
  });

  return {
    atMounted,
    columns,
    filter,
    log,
    current,
    sig: computed(() => objectSignature(filter)),
  };
});
