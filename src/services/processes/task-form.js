import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import save, { upload } from '~/helpers/save';
import useToast from '~/composables/useToast.js';

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
  checkboxes: [{ description: '' }],
  pipelines: [{}],
  temp_file_ids: [],
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

  if (key === 'checkboxes') {
    fields.checkboxes = this.checkboxes ?? defaults.checkboxes;
    return;
  }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => { Object.keys(fields).forEach(setField, payload ?? {}); };

const log = (e) => { files.value = e.target.files; };

export default () => effectScope().run(() => {
  const toaster = useToast();

  const { route, isThePage, redirectTo } = useAppRouter('ProcessTaskEdit');

  if (!fields) {
    fields = reactive(defaults);
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

    success && redirectTo({ name: 'Task', params: { id: data?.task?.id } });
  };

  const atMounted = async () => {
    if (!isThePage.value) return;
    const { id } = route.params;
    if (id) {
      let task = {};
      task = await $.process_task(route.params.id);
      await setForm(task);
    }
  };

  onScopeDispose(() => {
    fields = undefined;
    files = undefined;

    defaults.checkboxes = [{ description: '' }];
    defaults.pipelines = [{}];
    defaults.temp_file_ids = [];
  });

  return {
    fields,
    isEditPage: isThePage,
    saveTask,
    atMounted,
    log,
  };
});
