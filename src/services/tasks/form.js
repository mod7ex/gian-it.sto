import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import save, { upload } from '~/helpers/save';
import useToast from '~/composables/useToast.js';

const defaultFields = {
  id: '',
  name: '',
  description: '',
  order_id: undefined,
  user_id: 3,
  deadline_at: '',
  position: 0,
  status: '',
  checkboxes: [''],

  // start_at: '',
  // end_at: '',

  pipelines: [],
  temp_file_ids: [],
};

let fields;
let files;

export default () => effectScope().run(() => {
  const toaster = useToast();

  const { route, isThePage, redirectTo } = useAppRouter('TaskEdit');

  if (!fields) {
    fields = reactive(defaultFields);
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

    success && redirectTo({ name: 'Task', params: { id: data?.task?.id } });
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

  const setForm = async (payload) => {
    Object.keys(fields).forEach(setField, payload ?? {});

    if (!fields.deadline_at) return;

    fields.deadline_at = hyphenatedDateFormat(fields.deadline_at);
  };

  const atMounted = async () => {
    const { id } = route.params;
    if (isThePage.value && id) {
      let task = {};
      task = await $.task(route.params.id);
      await setForm(task);
    }
  };

  const log = (e) => {
    files.value = e.target.files;
  };

  onScopeDispose(() => {
    fields = undefined;
    files = undefined;
  });

  return {
    fields,
    isEditPage: isThePage,
    saveTask,
    atMounted,
    log,
  };
});
