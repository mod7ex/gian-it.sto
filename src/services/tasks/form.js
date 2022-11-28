import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import save, { upload } from '~/helpers/save';
import useToast from '~/composables/useToast.js';
import depStore from '~/store/departments';
import store from '~/store/tasks';

const { setTask } = store;

const toaster = useToast();
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

  start_at: '',
  end_at: '',

  is_map: 'false',

  map_id: '',
};

const deepDefaults = {
  checkboxes: [{ description: '' }],
  pipelines: [{}],
  temp_file_ids: [],
  delete_file_ids: [],
  files: [],
};

let fields;
let files;

// **********************************************************************  Form
const setFieldFor = (target, key, from) => {
  if (key.includes('_id')) {
    if (key === 'temp_file_ids') return;
    if (key === 'delete_file_ids') return;

    if (key === 'map_id') {
      target.map_id = from.task_map?.map_id;
      return;
    }

    target[key] = from[key.replace('_id', '')]?.id;
    return;
  }

  if (key === 'is_map') {
    target.is_map = from.is_map ? 'true' : 'false';
    return;
  }

  if (key === 'pipelines') {
    if (!from.pipelines || from.pipelines?.length === 0) {
      target.pipeline = [{}];
    } else {
      target.pipelines = from.pipelines?.map(({ pipeline: { id: pipeline_id }, stage }) => ({ pipeline_id, stage_id: stage?.id }));
    }
    return;
  }

  if (key === 'checkboxes') {
    target.checkboxes = from.checkboxes ?? defaults.checkboxes;
    if (target.checkboxes?.length === 0) target.checkboxes.push('');
    return;
  }

  if (['end_at', 'start_at', 'deadline_at'].includes(key)) {
    target[key] = hyphenatedDateFormat(from[key]);
    return;
  }

  target[key] = (from[key] ?? defaults[key]) ?? deepDefaults[key];
};

const setField = function (key) {
  setFieldFor(fields, key, this);
};

const setForm = async (payload) => {
  Object.keys(fields).forEach(setField, payload ?? {});
};

const log = (e) => {
  files.value = e.target.files;
};

const rawTask = () => ({
  id: '',
  name: '',
  description: '',
  order_id: '',
  user_id: '',
  deadline_at: '',
  position: '',
  status: '',
  start_at: '',
  end_at: '',
  is_map: 'false',
  map_id: '',
  checkboxes: [{ description: '' }],
  pipelines: [{}],
  temp_file_ids: [],
  delete_file_ids: [],
  files: [],
});

export const updateTaskUserId = async (payload, user_id) => {
  const raw = rawTask();

  Object.keys(raw).forEach(function (key) {
    setFieldFor(raw, key, this);
  }, payload);

  const { data, success, message } = await save.task({ ...raw, user_id, department_id: current.value, is_map: raw.is_map == 'true' });

  try {
    return { success, message };
  } finally {
    if (success) setTask(data?.task);
  }
};

export default () => effectScope().run(() => {
  const { route, isThePage, redirectTo, back } = useAppRouter('TaskEdit');

  const { order_id } = route.query;

  if (!fields) {
    fields = reactive(rawTask());
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

    // fields.is_map = (fields.is_map == 'true');
    // if (fields.is_map) {
    //   delete fields.checkboxes;
    //   delete fields.pipelines;
    //   delete fields.temp_file_ids;
    //   delete fields.delete_file_ids;
    //   delete fields.files;
    // }

    const { data, success } = await save.task({ ...fields, is_map: fields.is_map == 'true', department_id: current.value }, null, true);

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

    // deepDefaults.checkboxes = [{ description: '' }];
    // deepDefaults.pipelines = [{}];
    // deepDefaults.temp_file_ids = [];
    // deepDefaults.delete_file_ids = [];
    // deepDefaults.files = [];
  });

  return {
    fields,
    // selectedFunnelsIds: computed(() => fields.pipelines.map(({ pipeline_id }) => Number(pipeline_id))),
    isEditPage: isThePage,
    saveTask,
    atMounted,
    log,
    route,
    back,
  };
});
