<script setup>
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/vue/solid';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/vue/outline';
import Layout from '@/Layout/Work.vue';
import Feeds from '@/UI/Feeds.vue';
import Button from '@/UI/Button.vue';
import service from '~/services/tasks/worker-preview';
import WorkerPreview from '~/components/Partials/tasks/WorkerPreview.vue';
import useSuspense from '~/composables/useSuspense';

const SuspenseArea = useSuspense(WorkerPreview);

const { task, clearMemo, ping, canTasks } = service();

clearMemo();

const timeline = [
  {
    id: 1,
    content: 'Поставлено',
    target: 'на Вася Пупкину',
    href: null,
    date: '20 сентября',
    datetime: '22.10.2020',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Принято',
    target: 'Василием Пупкином',
    href: null,
    date: '21 сентября',
    datetime: '2020-09-22',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: '1 этап завершён',
    target: 'Василием Пупкином',
    href: null,
    date: '22 сентября',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Изменено',
    target: 'руководителем',
    href: null,
    date: '25 сентября',
    datetime: '2020-09-30',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Завершено',
    target: 'Василием Пупкином',
    href: null,
    date: '1 октября',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];
</script>

<template>
  <Layout :title="task?.name">
    <template #actions>
      <Button type="secondary" :link="{ name: 'WorkerTasks' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
      </Button>
    </template>

    <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3 ">
      <div class="space-y-6 lg:col-start-1 lg:col-span-2">
        <suspense-area />
      </div>

      <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Выполнено по текущему процессу</h2>

          <Feeds :items="timeline" class="mt-5" />

          <div class="mt-6 grid grid-cols-3 gap-x-2">
            <!-- <Button color="blue" class="justify-center">Завершить текущую задачу</Button> -->
            <Button class="col-span-1 flex justify-center" color="purple" @click="() => ping(true)" blur v-if="((task?.status === 'wait') || (task?.status === 'done') || (task?.status === 'pause')) && canTasks(task, 'update')">
              <ClockIcon class="w-5 h-5 mr-1"/>Начать
            </Button>

            <Button class="col-span-1 flex justify-center" color="yellow" v-if="canTasks(task, 'update')">на паузу</Button>

            <Button class="col-span-1 flex justify-center" color="green" @click="() => ping(false)" blur v-if="((task?.status === 'process') || (task?.status ==(task?.status === 'process') || (task?.status === 'pause')== 'pause')) && canTasks(task, 'update')">
              Завершить
            </Button>

          </div>
        </div>
      </section>

    </div>
  </Layout>
</template>
