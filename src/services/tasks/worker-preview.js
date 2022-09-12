import { ref, effectScope, computed } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import { debounce } from '~/helpers';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import useToast from '~/composables/useToast';
import { canTasks, userHasPermission } from '~/lib/permissions';
import useAuth from '~/composables/useAuth.js';

const { user } = useAuth();

const toaster = useToast();

let task;
let allowed;
let imExecuter;

export default () => effectScope().run(() => {
  const { route, back } = useAppRouter();

  if (!task) {
    task = ref({});

    imExecuter = computed(() => task.value.user?.id == user.value.id);
    allowed = computed(() => (task.value.status === 'process') && (imExecuter.value || userHasPermission('update status tasks')));
  }

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
    if (success) task.value = data?.task;
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
    allowed,
    imExecuter,
    clearMemo: () => { task = undefined; allowed = undefined; },
  };
});
