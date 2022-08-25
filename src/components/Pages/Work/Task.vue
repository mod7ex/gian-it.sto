<script setup>
import { computed } from 'vue';
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/vue/solid';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/vue/outline';
import Layout from '@/Layout/Work.vue';
import Feeds from '@/UI/Feeds.vue';
import Button from '@/UI/Button.vue';
import service from '~/services/tasks/worker-preview';
import WorkerPreview from '~/components/Partials/tasks/WorkerPreview.vue';
import useSuspense from '~/composables/useSuspense';
import { tasksColorMap, ruMonths } from '~/helpers';

const SuspenseArea = useSuspense(WorkerPreview);

const { task, clearMemo, ping, canTasks } = service();

clearMemo();

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
      target: `${created_user.name ?? ''} ${created_user.surname ?? ''}`,
      // target: `${created_user.name ?? ''} ${created_user.username ?? ''} ${created_user.middle_name ?? ''}`,
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

// const tm = [
//   {
//     id: 1,
//     content: 'Поставлено',
//     target: 'на Вася Пупкину',
//     href: null,
//     date: '20 сентября',
//     datetime: '22.10.2020',
//     icon: UserIcon,
//     iconBackground: 'bg-gray-400',
//   },
//   {
//     id: 2,
//     content: 'Принято',
//     target: 'Василием Пупкином',
//     href: null,
//     date: '21 сентября',
//     datetime: '2020-09-22',
//     icon: ThumbUpIcon,
//     iconBackground: 'bg-blue-500',
//   },
//   {
//     id: 3,
//     content: '1 этап завершён',
//     target: 'Василием Пупкином',
//     href: null,
//     date: '22 сентября',
//     datetime: '2020-09-28',
//     icon: CheckIcon,
//     iconBackground: 'bg-green-500',
//   },
//   {
//     id: 4,
//     content: 'Изменено',
//     target: 'руководителем',
//     href: null,
//     date: '25 сентября',
//     datetime: '2020-09-30',
//     icon: ThumbUpIcon,
//     iconBackground: 'bg-blue-500',
//   },
//   {
//     id: 5,
//     content: 'Завершено',
//     target: 'Василием Пупкином',
//     href: null,
//     date: '1 октября',
//     datetime: '2020-10-04',
//     icon: CheckIcon,
//     iconBackground: 'bg-green-500',
//   },
// ];
</script>

<template>
  <Layout :title="task?.name">
    <template #actions>
      <Button type="secondary" :link="{ name: 'WorkerTasks' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
      </Button>
    </template>

    <!-- <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3 "> -->
    <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-6 ">
      <div class="space-y-6 lg:col-start-1 lg:col-span-4">
        <suspense-area />
      </div>

      <section aria-labelledby="timeline-title" class="lg:col-start-5 lg:col-span-2">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Выполнено по текущему процессу</h2>

          <Feeds :items="timeline" class="mt-5 max-h-vh overflow-y-scroll" />

          <div class="mt-6 grid grid-cols-3 gap-x-2" :key="task.status">
            <Button class="col-span-1 flex justify-center" color="purple" @click="() => ping('process')" blur :disabled="!((task?.status === 'wait') || (task?.status === 'done') || (task?.status === 'pause')) && canTasks(task, 'update')" >
              <!-- <ClockIcon class="w-5 h-5 mr-1"/> -->
              Начать
            </Button>

            <Button class="col-span-1 flex justify-center" @click="() => ping('pause')" color="yellow" :disabled="(!canTasks(task, 'update')) || (task?.status === 'pause') || (task?.status === 'done') || (task?.status === 'wait')" >на паузу</Button>

            <Button class="col-span-1 flex justify-center" color="green" @click="() => ping('done')" blur :disabled="!((task?.status === 'process') || (task?.status === 'process') || (task?.status === 'pause')) && canTasks(task, 'update')" >
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
