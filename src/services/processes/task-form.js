import { reactive, ref, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import save, { upload } from '~/helpers/save';
import useAuth from '~/composables/useAuth';
import useToast from '~/composables/useToast.js';

const toaster = useToast();

const { user } = useAuth();

let routeInstance;
let isEditPage;
let redirect;

const defaultFields = {
  id: '',
  name: '',
  description: '',
  order_id: undefined,
  user_id: user.value.id,
  deadline_at: '',
  position: 0,
  status: '',
  checkboxes: [''],

  // start_at: '',
  // end_at: '',

  // pipelines: [],
  // temp_file_ids: [],
};

let files;
let fields;

/* ************ task form ************ */

const saveTask = async () => {
  //   const fileSet = new FormData();
  //   files.value.forEach((file, i) => {
  //     fileSet.set(`file-${i}`, file);
  //   });

  //   const { message: msg, success: suc } = await upload('temp/files', fileSet);

  //   if (suc) toaster.success('Файлы успешно загружены');
  //   else toaster.danger(msg ?? 'Что-то пошло не так, не удалось загрузить файлы');

  const { data, success } = await save.process_task(fields, null, true);

  //   success && redirect({ name: 'Task', params: { id: data?.task?.id } });
};

// **********************************************************************  Form
const setField = function (key) {
  if (key.includes('_id')) {
    if (key === 'user_id') return;
    if (key === 'temp_file_ids') return;

    fields[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  fields[key] = this[key] ?? defaultFields[key];
};

const setForm = async (payload = {}) => {
  Object.keys(fields).forEach(setField, payload);

  if (!fields.deadline_at) return;

  fields.deadline_at = hyphenatedDateFormat(fields.deadline_at);
};

const atMounted = async () => {
  let task = {};

  if (isEditPage.value && routeInstance.params.id) task = await $.process_task(routeInstance.params.id);

  await setForm(task);
};

const log = (e) => {
  files.value = e.target.files;
};

export default function () {
  const { route, isThePage, redirectTo } = useAppRouter('ProcessTaskEdit');

  [routeInstance, isEditPage, redirect] = [route, isThePage, redirectTo];

  files = ref([]);

  fields = reactive({ ...defaultFields });

  onScopeDispose(() => {
    files = undefined;
    fields = undefined;
  });

  return {
    fields,
    isEditPage,
    saveTask,
    atMounted,
    log,
  };
}
