import { ref, effectScope, onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import { debounce } from '~/helpers';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import useToast from '~/composables/useToast';
import { canTasks } from '~/lib/permissions';

const toaster = useToast();

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

  const ping = async (status) => {
    if (status === task.value.status) return;
    const path = `tasks/${task_id}/to/${status}`;
    const { success, message, data } = await save({ path });
    // const { success, message, data } = await save({ path, data: { [`${status ? 'start' : 'end'}_at`]: hyphenatedDateFormat(new Date()) } });
    if (success) task.value.status = data?.task?.status;
    const msg = message ?? (success ? 'Статус успешно изменен' : 'Не удалось изменить статус задача');
    toaster[success ? 'success' : 'danger'](msg);
  };

  return {
    canTasks,
    task,
    atMounted,
    checkBox,
    back,
    route,
    ping,
    task_id,
    clearMemo: () => onScopeDispose(() => { task = undefined; }),
  };
});
