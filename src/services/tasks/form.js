import { reactive, ref, effectScope, onScopeDispose, computed } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat, deepCopyObj } from '~/helpers';
import save, { upload } from '~/helpers/save';
import useToast from '~/composables/useToast.js';
import depStore from '~/store/departments';

const { current } = depStore;

const defaults = {
  id: '',
  name: '',
  description: '',
  order_id: '',
  user_id: '',
  deadline_at: '',
  position: '',
  status: '',

  files: '',

  start_at: '',
  end_at: '',
};

const deepDefaults = {
  department_id: current,
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
    if (fields.checkboxes.length === 0) fields.checkboxes.push('');
    return;
  }

  if (['end_at', 'start_at', 'deadline_at'].includes(key)) {
    fields[key] = hyphenatedDateFormat(this[key]);
    return;
  }

  fields[key] = this[key] ?? defaults[key];
};

const setForm = async (payload) => {
  Object.keys(fields).forEach(setField, payload ?? {});
};

const log = (e) => {
  files.value = e.target.files;
};

export default () => effectScope().run(() => {
  const toaster = useToast();

  const { route, isThePage, redirectTo } = useAppRouter('TaskEdit');

  const { order_id } = route.query;

  if (!fields) {
    fields = reactive({ ...deepCopyObj(defaults), ...deepDefaults });
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

    const { data, success } = await save.task(fields, null, true);

    if (success) {
      if (order_id != null) {
        redirectTo({ name: 'OrderEdit', params: { id: order_id }, query: { tab: 'tasks' } });
        return;
      }

      redirectTo({ name: 'Task', params: { id: data?.task?.id } });
    }
  };

  const atMounted = async () => {
    if (isThePage.value) {
      const { id } = route.params;
      if (id) {
        let task = {};
        task = await $.task(route.params.id);
        await setForm(task);
      }
    } else if (order_id) fields.order_id = order_id;
  };

  onScopeDispose(() => {
    fields = undefined;
    files = undefined;

    deepDefaults.checkboxes = [{ description: '' }];
    deepDefaults.pipelines = [{}];
    deepDefaults.temp_file_ids = [];
  });

  return {
    fields,
    selectedFunnelsIds: computed(() => fields.pipelines.map(({ pipeline_id }) => Number(pipeline_id))),
    isEditPage: isThePage,
    saveTask,
    atMounted,
    log,
  };
});
