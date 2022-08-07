import { ref, effectScope } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import { debounce, hyphenatedDateFormat } from '~/helpers';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import useToast from '~/composables/useToast';

const toaster = useToast();

// ********** Fix : Rate limiter not needed in fact debouncer is needed
/*
const last = ref(Date.now());

const notify = async () => {
  const now = Date.now();
  if (now - last.value > 5000) { // 5 seconds
    last.value = now;
    await checkBox()
  }
};
*/

let task;

export default () => effectScope().run(() => {
  const { route, back } = useAppRouter();

  if (!task) { task = ref({}); }

  const atMounted = async () => {
    const { id } = route.params;

    task.value = await $.task(id);

    if (!task.value.id) back();
  };

  const checkBox = debounce(async (_id, is_checked, i) => {
    const { success, message } = await save({ path: `tasks/checkboxes/${_id}/status`, data: { is_checked } });
    if (!success) {
      toaster.danger(message ?? 'Не удалось изменить статус флажка');
      task.value.checkboxes[i].is_checked = !is_checked;
    }
  });

  const task_id = route.params.id;

  const ping = async (start) => {
    const path = `tasks/${task_id}/to/${start ? 'process' : 'done'}`;
    const { success, message, data } = await save({ path, data: { [`${start ? 'start' : 'end'}_at`]: hyphenatedDateFormat(new Date()) } });
    if (success) {
      task.value.status = data?.task?.status;
    }
    const msg = message ?? (success ? 'Статус успешно изменен' : 'Не удалось изменить статус задача');
    toaster[success ? 'success' : 'danger'](msg);
  };

  return {
    task,
    atMounted,
    checkBox,
    back,
    route,
    ping,
    task_id,
    clearMemo: () => { task = undefined; },
  };
});
