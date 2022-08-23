<script setup>
import { computed } from 'vue';
import service from '~/services/tasks/worker';
import { ruMonths } from '~/helpers';
import Table from '@/Layout/Table.vue';

const { fetchTasks, state, edge } = service();

const calcMinsDiff = (end, start) => ((new Date(end)).getTime() - (new Date(start)).getTime()) / (1000 * 60);

const getClosedTasksNumberIn = (day) => state.raw.filter(({ logs }) => {
  for (let i = 0; i < logs.length; i++) {
    const { created_at, data } = logs[i];
    const d = (new Date(created_at.split(' ')[0])).getTime();
    if (data?.status === 'done' && d === day) return true;
  }

  return false;
}).length;

const getWorkedHoursNumberIn = (day) => {
  let workedHours = 0;

  state.raw.forEach(({ logs }) => {
    const taskWorkedHours = [];

    for (let i = 0; i < logs.length; i++) {
      const { created_at, data } = logs[i];
      const d = (new Date(created_at.split(' ')[0])).getTime();
      if ('status' in data && d === day) { // tasks that had the status changed today (worker touched it)
        taskWorkedHours.push({ at: created_at, mode: data.status }); // we suppose they are sorted from server otherwise we sort them
      }
    }

    if (taskWorkedHours.length) {
      // worker didn't pause or finish the task yesterday
      const { mode: mode_0, at: at_0 } = taskWorkedHours[0];
      if (mode_0 !== 'process') workedHours += calcMinsDiff(at_0, day);

      // worker didn't pause or finish the task today
      const { mode_l, at_l } = taskWorkedHours[taskWorkedHours.length - 1];
      if (mode_l === 'process') workedHours += calcMinsDiff(at_l, new Date().getTime());

      if (taskWorkedHours.length > 1) {
        let i = 0;

        while (i + 1 < taskWorkedHours.length) {
          const { mode: mode_p, at: at_p } = taskWorkedHours[i];
          const { mode: mode_n, at: at_n } = taskWorkedHours[i + 1];

          if (mode_p === 'process' && mode_n !== 'process') workedHours += calcMinsDiff(at_n, at_p);

          i++;
        }
      }
    }
  });

  return workedHours;
};

const createDays = () => {
  let start = (new Date(edge.from)).getTime();
  const end = (new Date(edge.to)).getTime();

  const days = [];

  while (start <= end) {
    const mins = getWorkedHoursNumberIn(start);
    const worked_hours = `${Math.floor(mins / 60)}ч ${Math.floor(mins % 60)}мин`;
    days.push({ day: start, worked_hours, closed_tasks: getClosedTasksNumberIn(start) });
    start += 24 * 60 * 60 * 1000; // next day
  }

  return days;
};

const times = computed(() => createDays(edge.from, edge.to));

const fields = [
  { label: 'Day', key: 'day' },
  { label: 'Количество отработанного времени', key: 'worked_hours' },
  { label: 'Количество закрытых задач', key: 'closed_tasks' },
];

await fetchTasks(true);

</script>

<template>
  <Table
    :fields="fields"
    :items="times"
    :actions="false"
  >
    <template #td-day="{ value }" >
      {{ new Date(value).getDate() }} {{ ruMonths[new Date(value).getMonth()] }}
    </template>

    <template #td-worked_hours="{ value }" >
      {{ value }}
    </template>

    <template #td-closed_tasks="{ value }" >
      {{ value }}
    </template>
  </Table>
</template>