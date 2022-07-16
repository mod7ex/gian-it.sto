import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import save, { upload } from '~/helpers/save';
import useToast from '~/composables/useToast.js';

import departmentStore from '~/store/departments';

const { current } = departmentStore;

const toaster = useToast();

let fields;
let files;

const defaults = {
  id: 100,

  user_id: '',
  client_id: '',
  car_id: '',

  appeal_reason_id: '',
  process_id: '',
  pipeline_id: '',

  checkboxes: [''],

  department_id: current,

  comment: '',

  temp_file_ids: [],
};

// **********************************************************************  Form

const setField = function (key) {
  if (key.includes('_id')) {
    fields[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => {
  Object.keys(fields).forEach(setField, payload ?? {});

  if (!fields.deadline_at) return;

  fields.deadline_at = hyphenatedDateFormat(fields.deadline_at);
};

const log = (e) => {
  files.value = e.target.files;
};

export default () => effectScope().run(() => {
  const { route, isThePage, redirectTo } = useAppRouter('OrderEdit');

  if (!fields) {
    fields = reactive(defaults); // make a deep compy of defaults
    files = ref();
  }

  /* ************ Order form ************ */

  const saveOrder = async () => {
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

    const { success } = await save.order(fields, null, true);

    success && redirectTo({ name: 'Orders' });
  };

  const atMounted = async () => {
    const { id } = route.params;
    if (isThePage.value && id) {
      let order = {};
      order = await $.order(route.params.id);
      await setForm(order);
    }
  };

  onScopeDispose(() => {
    fields = undefined;
    files = undefined;
  });

  return {
    fields,
    isEditPage: isThePage,
    saveOrder,
    atMounted,
    log,
    current,
  };
});
