import { reactive, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import store from '~/store/processes/tasks';

const { drop } = store;

const defaults = {
  id: '',
  name: '',
  description: '',
  role_id: '',
  order_stage_id: '',
  position: '',
  files: '',
  time: '',
  dc_id: '',
};

let fields;

// **********************************************************************  Form
const setField = function (key) {
  if (key.includes('_id')) {
    fields[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  if (key === 'process_categories') {
    fields.process_categories = this.process_categories?.map(({ id }) => id) ?? [];
    return;
  }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => { Object.keys(fields).forEach(setField, payload ?? {}); };

export default (process_category) => effectScope().run(() => {
  const { route, isThePage, redirectTo } = useAppRouter('DcEdit');

  const dropTask = async (_id) => {
    const { success, message } = await drop(_id);
    try {
      return { success, message };
    } finally {
      success && isThePage.value && redirectTo({ name: 'Process', params: { id: process_category } });
    }
  };

  if (!fields) {
    fields = reactive({ ...defaults, process_categories: [process_category] }); // FIX: issue with deep
  }

  /* ************ task form ************ */

  const saveDk = async () => {
    const { data, success } = await save.map_question(fields, null, true);

    success && redirectTo({ name: 'DcEdit', params: { dk: data?.map_question?.id, id: process_category } });
  };

  const atMounted = async () => {
    if (!isThePage.value) return;
    const { task } = route.params;
    if (task) {
      let mq = {};
      mq = await $.map_question(task);
      await setForm(mq);
    }
  };

  onScopeDispose(() => { fields = undefined; });

  return {
    fields,
    isEditPage: isThePage,
    saveDk,
    atMounted,
    dropTask,
  };
});
