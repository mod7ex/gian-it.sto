import { reactive } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import save from '~/helpers/save';

let routeInstance;
let isEditPage;
let redirect;

const fields = reactive({
  name: '',
  description: '',
  order_id: undefined,
  user_id: undefined,
  deadline_at: '',

  status: '',
  position: 0,
  start_at: '',
  end_at: '',

  pipelines: [],
  checkboxes: [''],
  temp_file_ids: [],
});

/* ************ task form ************ */

const saveTask = async () => {
  const { data } = await save.task(fields, null, true);

  redirect({ name: 'Task', params: { id: data?.task?.id } });
};

//   *********************************  Form
const setField = function (key) {
  fields[key] = this[key] ?? '';
};

const setForm = async (payload) => {
  Object.keys(fields).forEach(setField, payload);

  if (!fields.born_at) return;

  fields.born_at = hyphenatedDateFormat(fields.born_at);
};

const atMounted = async () => {
  const task = (isEditPage.value && routeInstance.params.id) && await $.task(routeInstance.params.id);

  await setForm(task || {});
};

export default function () {
  const { route, isThePage, redirectTo } = useAppRouter('TaskEdit');

  [routeInstance, isEditPage, redirect] = [route, isThePage, redirectTo];

  return {
    fields,
    isEditPage,
    saveTask,
    atMounted,
  };
}
