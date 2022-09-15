import { effectScope, ref, computed } from 'vue';
import save from '~/helpers/save';
import pipelinesStore from '~/store/pipelines';
import { objectSignature, cleanUp } from '~/helpers';
import useToast from '~/composables/useToast';
import service from '~/services/tasks/worker';
import store from '~/store/tasks';

const toaster = useToast();

const { state: funnelsState, load: loadFunnels, options, funnelById } = pipelinesStore;
const { tasksInFunnel, state, setTaskFunnelStage, reset, fill } = store;

let filter;
let theSelectedFunnel;
let columns;

let getTasks;

const getKanBanPayload = (v) => {
  // funnel as an argument

  if (!v) return {};

  const funnel = funnelById(v);

  const tasks_in_this_funnel = tasksInFunnel(v);

  const kanban = funnel.stages.reduce((payload, curr) => {
    const { id, color, name } = curr;

    const tasks = tasks_in_this_funnel.filter(({ pipelines }) => (pipelines.some(({ pipeline, stage }) => (pipeline?.id == v && stage?.id == id))));

    payload[id] = {
      tasks,
      name,
      color,
    };

    return payload;
  }, {});

  return kanban;
};

const fillColumns = (v) => {
  columns.value = getKanBanPayload(v);
};

const log = async (e) => {
  const { item: { id: task }, to: { id: stage_id } } = e;
  const funnel_id = theSelectedFunnel.value;

  // eslint-disable-next-line
  const task_stage = state.raw.find(({ id }) => id == task)?.pipelines.find(({ pipeline }) => pipeline.id == funnel_id)?.stage?.id;
  // eslint-disable-next-line
  if (task_stage == stage_id) return;

  const { message, success } = await save({ data: { stage_id }, path: `tasks/${task}/pipelines/${funnel_id}/stage` });

  if (!success) {
    toaster.danger(message ?? 'Что-то пошло не так');
    return fillColumns(funnel_id);
  }

  const funnel = funnelById(funnel_id);

  const stage = funnel.stages.find(({ id }) => id == stage_id);

  setTaskFunnelStage(task, funnel_id, stage);

  return toaster.success('Этап изменен');
};

const atMounted = async () => {
  await Promise.all([loadFunnels(), getTasks(true)]).then(() => {
    theSelectedFunnel.value = funnelsState.raw[0]?.id;
  });
};

export default () => effectScope().run(() => {
  const { filter: _filter, resetFilter } = service();

  if (!columns) {
    columns = ref({});
    theSelectedFunnel = ref();
    filter = _filter;
    getTasks = async (bool = true) => {
      if (bool) reset();
      // await fill({ ...cleanUp(filter), user_id: user.value?.id }, false);
      await fill(cleanUp(filter), false);
    };
  }

  return {
    getKanBanPayload,
    atMounted,
    filter,
    log,
    columns,
    state,
    options,
    theSelectedFunnel,
    sig: computed(() => objectSignature(filter)),
    resetFilter,
    fillColumns,
    clearMemo: () => {
      filter = undefined;
      getTasks = undefined;
      columns = undefined;
    },
  };
});
