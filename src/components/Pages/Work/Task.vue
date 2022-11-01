<script setup>
import { computed, onScopeDispose } from 'vue';
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/vue/solid';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/vue/outline';
import Layout from '@/Layout/Work.vue';
import Feeds from '@/UI/Feeds.vue';
import Button from '@/UI/Button.vue';
import service from '~/services/tasks/worker-preview';
import WorkerPreview from '~/components/Partials/tasks/WorkerPreview.vue';
import useSuspense from '~/composables/useSuspense';
import { tasksColorMap, ruMonths } from '~/helpers';
import useAppRouter from '~/composables/useAppRouter';

const { query } = useAppRouter();

const SuspenseArea = useSuspense(WorkerPreview);

const { task, clearMemo, ping, engagedIn, canTasks } = service();

onScopeDispose(clearMemo);

const canStart = computed(() => {
  if (((task.value?.status === 'wait') || (task.value?.status === 'done') || (task.value?.status === 'pause'))) {
    // return engagedIn.value || canTasks(task.value, 'update_status');
    return canTasks(task.value, 'update_status');
  }

  return false;
});

const canPause = computed(() => {
  if ((task.value?.status === 'process') || (task.value?.status === 'wait')) {
    // return engagedIn.value || canTasks(task.value, 'update_status');
    return canTasks(task.value, 'update_status');
  }
  return false;
});

const canEnd = computed(() => {
  if ((task.value?.status === 'process') || (task.value?.status === 'pause')) {
    // return engagedIn.value || canTasks(task.value, 'update_status');
    return canTasks(task.value, 'update_status');
  }

  return false;
});

const EVENTS = {
  TASK_CREATED: { iconBackground: 'bg-gray-400', icon: UserIcon },
  TASK_STATUS: { iconBackground: 'bg-green-500', icon: CheckIcon },
  TASK_UPDATED: { iconBackground: 'bg-blue-500', icon: ThumbUpIcon },
};

const createContent = ({ type, status }) => {
  const r = {};
  if (type === 'task_created') { r.ev = 'TASK_CREATED'; r.content = 'Поставлено на'; }
  if (type === 'task_updated') { r.ev = 'TASK_UPDATED'; r.content = 'Задача обновлена'; }
  if (type === 'task_status') { r.ev = 'TASK_STATUS'; r.content = `Статус изменен (${tasksColorMap[status].label})`; }
  return r;
};

const timeline = computed(() => {
  // console.log(task?.value?.logs?.map(({ type, data, created_at }) => ({ type, details: { ...data }, created_at })));

  const v = [];

  task?.value?.logs?.forEach(({ created_at, created_user, data, type }, id) => {
    if (type === 'task_updated' && 'status' in data) return; // handel duplication from server

    const { ev, content } = createContent({ type, ...data });

    if (!ev || !content) return;

    const d = new Date(created_at.split(' ')[0]);

    const date = `${d.getDate()} ${ruMonths[d.getMonth()]} ${created_at.split(' ')[1].substr(0, 5)}`;

    if (type === 'task_created') created_user = task.value.user;

    const dot = {
      id,
      content,
      target: `${created_user?.name ?? ''} ${created_user?.middle_name ?? ''}`,
      // target: `${created_user.name ?? ''} ${created_user.middle_name ?? ''} ${created_user.username ?? ''}`,
      date,
      datetime: created_at,
      data: { ...data },
      icon: EVENTS[ev].icon,
      iconBackground: EVENTS[ev].iconBackground,
    };

    v.push(dot);
  });

  return v;
});

</script>

<template>
  <Layout :title="task?.name">
    <template #actions>
      <Button v-if="query.from === 'tasks'" type="secondary" :link="{ name: 'WorkerTasks' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
      </Button>
    </template>

    <!-- <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3 "> -->
    <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-6 ">
      <div class="space-y-6 lg:col-start-1 lg:col-span-4">
        <suspense-area />
      </div>

      <section aria-labelledby="timeline-title" class="lg:col-start-5 lg:col-span-2 relative">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 sticky top-3">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Выполнено по текущему процессу</h2>

          <Feeds :items="timeline" class="mt-5 max-h-vh overflow-y-scroll" />

          <div class="mt-6 flex justify-center gap-3" :key="task.status">
            <Button
              blur
              class="flex justify-center"
              color="purple"
              @click="() => ping('process')"
              v-if="canStart"
              :disabled="!canStart"
            >
              <!-- <ClockIcon class="w-5 h-5 mr-1"/> -->
              Начать
            </Button>

            <Button
              blur
              class="flex justify-center"
              @click="() => ping('pause')"
              color="yellow"
              v-if="canPause"
              :disabled="!canPause"
            >
              На паузу
            </Button>

            <Button
              blur
              class="flex justify-center"
              color="green"
              @click="() => ping('done')"
              v-if="canEnd"
              :disabled="!canEnd"
            >
              Завершить
            </Button>
          </div>
        </div>
      </section>

    </div>
  </Layout>
</template>

<style scoped>
.max-h-vh {
  max-height: 50vh;
}

.max-h-vh::-webkit-scrollbar {
  display: none;
}
</style>
