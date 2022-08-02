import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import save, { upload } from '~/helpers/save';
import { deepCopyObj } from '~/helpers';
import useToast from '~/composables/useToast.js';
import store from '~/store/processes/tasks';
import departmentStore from '~/store/departments';

const { drop } = store;
const { current } = departmentStore;

const defaults = {
  id: '',
  name: '',
  description: '',
  // order_id: undefined,
  // user_id: '',
  role_id: '',
  order_stage_id: '',
  position: '',
  files: '',
  time: '',
};

const deepDefaults = {
  process_checkboxes: [{ description: '' }],
  pipelines: [{}],
  temp_file_ids: [],
  department_id: current,
};

let fields;
let files;

// **********************************************************************  Form
const setField = function (key) {
  if (key.includes('_id')) {
    if (key === 'temp_file_ids') return;

    fields[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  if (key === 'pipelines') {
    fields.pipelines = this.pipelines?.map(({ pipeline: { id: pipeline_id }, stage: { id: stage_id } }) => ({ pipeline_id, stage_id })) ?? [{}];
    return;
  }

  if (key === 'process_checkboxes') {
    fields.process_checkboxes = this.process_checkboxes ?? defaults.process_checkboxes;
    if (fields.process_checkboxes.length === 0) fields.process_checkboxes.push('');
    return;
  }

  if (key === 'process_categories') {
    fields.process_categories = this.process_categories?.map(({ id }) => id) ?? [];
    return;
  }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => { Object.keys(fields).forEach(setField, payload ?? {}); };

const log = (e) => { files.value = e.target.files; };

export default (process_category) => effectScope().run(() => {
  const toaster = useToast();

  const { route, isThePage, redirectTo } = useAppRouter('ProcessTaskEdit');

  const dropTask = async (_id) => {
    const { success, message } = await drop(_id);
    try {
      return { success, message };
    } finally {
      success && redirectTo({ name: 'Process', params: { id: process_category } });
    }
  };

  if (!fields) {
    fields = reactive({ ...deepCopyObj(defaults), ...deepDefaults, process_categories: [process_category] }); // FIX: issue with deep
    files = ref();
  }

  /* ************ task form ************ */

  const saveTask = async () => {
    const len = files.value?.length ?? 0;
    if (len) {
      const fileSet = new FormData();

      for (let i = 0; i < len; i++) {
        fileSet.append('files[]', files.value[0]);
      }

      const { message: msg, success: suc, data } = await upload('temp/files', fileSet);

      if (suc) toaster.success('Файлы успешно загружены');
      else toaster.danger(msg ?? 'Что-то пошло не так, не удалось загрузить файлы');

      if (suc) fields.temp_file_ids = data?.files?.map(({ id }) => id);
      else {
        // eslint-disable-next-line no-void
        return void (0);
      }
    }

    const { data, success } = await save.process_task(fields, null, true);

    success && redirectTo({ name: 'ProcessTaskEdit', params: { task: data?.process_task?.id, id: process_category } });
  };

  const atMounted = async () => {
    if (!isThePage.value) return;
    const { task } = route.params;
    if (task) {
      let ts = {};
      ts = await $.process_task(task);
      await setForm(ts);
    }
  };

  onScopeDispose(() => {
    fields = undefined;
    files = undefined;

    deepDefaults.process_checkboxes = [{ description: '' }];
    deepDefaults.pipelines = [{}];
    deepDefaults.temp_file_ids = [];
    deepDefaults.process_categories = [];
  });

  return {
    fields,
    isEditPage: isThePage,
    saveTask,
    atMounted,
    log,
    dropTask,
  };
});
