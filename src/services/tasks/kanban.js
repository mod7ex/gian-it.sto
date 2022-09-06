import { effectScope, ref, computed } from 'vue';
// import save from '~/helpers/save';
import pipelinesStore from '~/store/pipelines';
import { objectSignature } from '~/helpers';
// import useToast from '~/composables/useToast';
import service from '~/services/tasks/worker';
import store from '~/store/tasks';

// const toaster = useToast();

const { state: funnelsState, load: loadFunnels, options, funnelById } = pipelinesStore;
const { tasksInFunnel, state } = store;

let filter;
let getTasks;
let theSelectedFunnel;

const getKanBanPayload = (v) => {
  // funnel as an argument

  if (!v) return {};

  const funnel = funnelById(v);

  const tasks_in_this_funnel = tasksInFunnel(v);

  const kanban = funnel.stages.reduce((payload, curr) => {
    const { id, color, name } = curr;

    const tasks = tasks_in_this_funnel.filter(({ pipelines }) => (pipelines.some(({ pipeline, stage }) => (pipeline.id == v && stage.id == id))));

    payload[id] = {
      tasks,
      name,
      color,
    };

    return payload;
  }, {});

  return kanban;
};

const log = async (e) => {
  // const { item: { id: orderId }, to: { id: order_stage_id } } = e;

  // // eslint-disable-next-line
  // const target = state.raw.find(({ id }) => id == orderId);
  // // eslint-disable-next-line
  // if (target.stage?.id == order_stage_id) return;

  // const { message, success } = await save({ data: { order_stage_id }, path: `orders/${orderId}/stage` });

  // if (!success) {
  //   toaster.danger(message ?? 'Что-то пошло не так');
  //   return fillColumns();
  // }

  // return toaster.success('Стадия заказа успешно обновлена');
};

const atMounted = async () => {
  await Promise.all([loadFunnels(), getTasks(true)]).then(() => {
    theSelectedFunnel.value = funnelsState.raw[0].id;
  });
};

export default () => effectScope().run(() => {
  const { fetchTasks, filter: _filter, resetFilter } = service();

  if (!filter) {
    theSelectedFunnel = ref();
    filter = _filter;
    getTasks = fetchTasks;
  }

  return {
    getKanBanPayload,
    atMounted,
    filter,
    log,
    state,
    options,
    theSelectedFunnel,
    sig: computed(() => objectSignature(filter)),
    clearMemo: () => {
      filter = undefined;
      getTasks = undefined;
    },
    resetFilter,
  };
});
