import { effectScope, onScopeDispose, ref, reactive, computed } from 'vue';
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
  // good
  console.log('yes');
  return true;
  /*
  const { item: { id: orderId }, to: { id: stage_id } } = e;

  const { message, success } = await save({ data: { stage_id }, path: `orders/${orderId}/pipelines/${StagesState.pipeline}/stage` });

  if (!success) {
    fillColumns();
    return toaster.danger(message ?? 'Что-то пошло не так');
  }

  return toaster.success('Стадия заказа успешно обновлена');
  */
};

const atMounted = async () => {
  await Promise.all([load({ department_id: current.value }), loadStages()]).then(fillColumns);
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
