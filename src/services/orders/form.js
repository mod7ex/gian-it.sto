import { reactive, ref, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import save, { upload } from '~/helpers/save';
import { deepCopyObj } from '~/helpers';
import communicate from '~/helpers/communicate';
import useToast from '~/composables/useToast.js';
// import pipelineStore from '~/store/pipelines';
import orderStore from '~/store/orders/orders';
import departmentStore from '~/store/departments';
import validationRules from '~/validationsRules/order';
// const { orderFunnelOption } = pipelineStore;
const { current } = departmentStore;
const { drop } = orderStore;

const toaster = useToast();

let fields;
let rawFields;
let files;
let orderId;
let v$;

const defaults = {
  id: '',

  user_id: '',

  client_id: '',

  order_stage_id: '',

  car_id: '',

  appeal_reason_id: '',

  process_category_id: '',

  total_sum: '',

  comment: '',
};

const refDefaults = {
  // pipeline_id: computed(() => orderFunnelOption.value[0].value),
  department_id: current,
};

const generateDefault = () => ({ ...deepCopyObj(defaults), ...refDefaults, ...{ checkboxes: [''], temp_file_ids: [], delete_file_ids: [] } });

const clearMemory = () => {
  fields = undefined;
  files = undefined;
  rawFields = undefined;
  v$ = undefined;
};

// **********************************************************************  Form

const setField = function (key) {
  if (key.includes('_id')) {
    if (key === 'temp_file_ids') return;
    if (key === 'delete_file_ids') return;

    if (['pipeline_id', 'department_id'].includes(key)) return;

    if (key === 'order_stage_id') {
      fields.order_stage_id = this.stage?.id;
      return;
    }

    fields[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  if (key === 'checkboxes') { fields[key] = ['']; return; }
  if (key === 'temp_file_ids') { fields[key] = []; return; }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => {
  Object.keys(fields).forEach(setField, payload ?? {});
  if (payload) Object.keys(payload).forEach((key) => { rawFields[key] = payload[key]; });
};

export const setOrder = async (order_id, check = false) => {
  if (check && fields.id) return;
  const order = await $.order(order_id ?? orderId);
  setForm(order);
};

const log = (e) => { files.value = e.target.files; };

export default () => effectScope().run(() => {
  const { route, isThePage, redirectTo, router } = useAppRouter('OrderEdit');

  if (!fields) {
    // Trying to make a deep copy of defaults, ISSUE : doesn't work for checkboxes
    fields = reactive(generateDefault());

    rawFields = reactive({});

    files = ref();

    orderId = route.params.id;

    const rules = validationRules();
    v$ = useVuelidate(rules, fields, { $lazy: true });
  }

  /* ************ Order form ************ */

  const saveOrder = async () => {
    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const len = files.value?.length ?? 0;
    if (len) {
      const fileSet = new FormData();

      for (let i = 0; i < len; i++) fileSet.append('files[]', files.value[0]);

      const { message: msg, success: suc, data } = await upload('temp/files', fileSet);

      if (suc) toaster.success('Файлы успешно загружены');
      else toaster.danger(msg ?? 'Что-то пошло не так, не удалось загрузить файлы');

      if (suc) fields.temp_file_ids = data?.files?.map(({ id }) => id);
      else {
        // eslint-disable-next-line no-void
        return void (0);
      }
    }

    const { success, data } = await save.order(fields, null, true);

    success && redirectTo({ name: 'OrderEdit', params: { id: data.order?.id } });
  };

  const atMounted = async () => {
    const { id } = route.params;
    if (isThePage.value && id) {
      await setOrder(route.params.id);

      return;
    }

    setForm(generateDefault());
  };

  const dropOrder = async () => {
    const { success, message } = await drop(route.params.id);

    success && redirectTo({ name: 'Orders' });

    const msg = message ?? communicate.drop[success ? 'success' : 'error'];

    try {
      return { success, message: msg };
    } finally {
      toaster[success ? 'success' : 'danger'](msg);
    }
  };

  return {
    fields,
    isEditPage: isThePage,
    saveOrder,
    atMounted,
    log,
    current,
    clearMemory,
    dropOrder,
    route,
    setOrder,
    router,
    rawFields,
    v$,
  };
});
