import { reactive, effectScope /* , customRef */ } from 'vue';
import { hyphenatedDateFormat, cleanUp } from '~/helpers';
import departmentStore from '~/store/departments';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/tasks';
import pipelinesStore from '~/store/pipelines';

const { state: funnelState, load: loadFunnels, options, funnelById } = pipelinesStore;

const { sort, fill, reset: resetStore, state } = store;

const { current } = departmentStore;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

let filter;
let edge;
let selection;

const clearMemo = () => { filter = undefined; edge = undefined; };

/*

const createRefEdges = () => {
  let value = (new Date()).getTime();
  return customRef((track, trigger) => ({
    get() {
      track();
      return hyphenatedDateFormat(value);
    },
    set(newValue) {
      value = (new Date(newValue)).getTime();
      trigger();
    },
  }));
};

*/

const fetchTasks = async (bool = false, payload) => {
  // Function is used to show worker tasks and to calculate Worker time
  if (bool) resetStore();
  await fill({ ...cleanUp(filter), ...payload }, false);
};

const initTimeEdges = () => {
  if (!edge) {
    edge = reactive({
      from: hyphenatedDateFormat(new Date(Date.now())),
      to: hyphenatedDateFormat(new Date()),
    });
  }

  return edge;
};

const resetFilter = () => {
  Object.keys(filter).forEach((key) => {
    filter[key] = '';
  });
};

export default () => effectScope().run(() => {
  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  if (!filter) {
    filter = reactive({
      name: '',
      status: '',
      order_id: '',
      order: '',
    });
  }

  if (!selection) selection = reactive({});

  return {
    order,
    filter,
    resetFilter,
    fetchTasks,
    current,
    clearMemo,
    state,
    initTimeEdges,
    edge,
    options,
    selection,
    loadFunnels,
    funnelState,
    funnelById,
  };
});
