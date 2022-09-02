import { reactive, effectScope, customRef } from 'vue';
import { hyphenatedDateFormat, cleanUp } from '~/helpers';
import useOrder from '~/composables/useOrder.js';
import departmentStore from '~/store/departments';
import store from '~/store/tasks';
import useAuth from '~/composables/useAuth';

const { sort, fill, reset: resetStore, state } = store;
const { user } = useAuth();

const { current } = departmentStore;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
  date: { label: 'По дате', sort: (a, b) => ((new Date(a.created_at).getTime()) - (new Date(b.created_at).getTime())) },
};

let filter;
let edge;

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

  const resetFilter = () => {
    Object.keys(filter).forEach((key) => {
      filter[key] = '';
    });
  };

  const fetchTasks = async (bool = false) => {
    // Function is used to show worker tasks and to calculate Worker time
    if (bool) resetStore();
    await fill({ user_id: user.value.id, ...cleanUp(filter) }, false);
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
  };
});
