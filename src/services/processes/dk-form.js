import { reactive, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import store from '~/store/processes/diagnostic-card';

const { drop } = store;

const defaults = {
  id: '',
  name: '',
  role_id: '',
  order_stage_id: '',
  position: '',
  time: '',
  map_id: '',
  is_map: true,
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

  const dropDk = async (_id) => {
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

  /* ************ dK form ************ */

  const saveDk = async () => {
    const { data, success } = await save.process_task(fields, null, true);

    // success && redirectTo({ name: 'DcEdit', params: { dk: data?.process_task?.id, id: process_category } });
    success && redirectTo({ name: 'Process', params: { id: process_category } });
  };

  const atMounted = async () => {
    if (!isThePage.value) return;
    const { dk } = route.params;
    if (dk) {
      let mq = {};
      mq = await $.process_task(dk);
      await setForm(mq);
    }
  };

  onScopeDispose(() => { fields = undefined; });

  return {
    fields,
    isEditPage: isThePage,
    saveDk,
    atMounted,
    dropDk,
  };
});
