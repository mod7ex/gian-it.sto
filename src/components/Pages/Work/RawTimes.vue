<script setup>
import { computed, shallowRef } from 'vue';
import service from '~/services/tasks/worker';
import { ruMonths } from '~/helpers';
import Table from '@/Layout/Table.vue';
import $ from '~/helpers/fetch.js';

const { state, edge, loadFunnels, selection } = service();

/*

const createDays = () => {
  let start = (new Date(edge.from)).getTime();
  const end = (new Date(edge.to)).getTime();
  const days = [];
  while (start <= end) {
    const mins = getWorkedMinsNumberIn(start);
    const work_time = `${Math.floor(mins / 60)}ч ${Math.floor(mins % 60)}мин`;
    days.push({ day: start, work_time, closed_tasks: getClosedTasksNumberIn(start) });
    start += ONE_DAY_IN_MS; // next day
  }
  return days;
};

*/

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const tasks = shallowRef();

const logStageId = (log) => log?.data?.pipelines?.filter(({ pipeline_id }) => pipeline_id == selection.funnel)[0]?.stage_id;

const toMs = (v) => new Date(v)?.getTime();

const stages = [81, 82, 83, 84];

/**
 * 
 * this function takes only the logs of a task, that were recorded from <from> to <to>
 * and shapes them out for better usage
 * @param {*} task 
 * @param {*} from 
 * @param {*} to 
 */
const taskFramedLogs = (task, from, to) => {
  const start = toMs(from);
  const end = toMs(to);

  const filterer = ({ created_at, type }) => ((start <= toMs(created_at) <= end) && type == 'task_status');
  // const filterer = ({ created_at, type }) => ((start <= toMs(created_at) <= end) && (type == 'task_status' || type === 'task_created'));

  return task?.logs?.filter(filterer).map(({ created_at, data, type }) => {
    const stage_id = logStageId({ data }) ?? stages[Math.floor(Math.random() * 4)]; // for test
    const status = data?.status;
    const timestamp = toMs(created_at);

    return { timestamp, status, type, stage_id }; // shape the log (we only care about these things)
  }) ?? [];
};

/**
 * filter by user and frame all his tasks logs
 */
const tasksWithFramedLogs = (v, from, to) => v?.map((task) => taskFramedLogs(task, from, to));

/**
 * the most complicated function
 * @param framedLogs {*} { timestamp, status, type, stage_id }[], can also mean a task
 * @param day {*} in ms
 */
const oneDayWorkTimeFromFramedLogs = (framedLogs, day) => {
  let workTime = 0;

  if (framedLogs.length) {
    // sort & filter only logs recorded in <day>
    const logs = framedLogs.sort((a, b) => a.timestamp - b.timestamp).filter(({ timestamp }) => ONE_DAY_IN_MS > timestamp - day >= 0 );

    if (logs.length) {
      // worker didn't pause or finish the task the starting of the day
      const { status: status_f, timestamp: timestamp_f } = logs[0];
      if (status_f === 'process') workTime += timestamp_f - day;

      // worker didn't pause or finish the task at the end of the day
      const { status: status_l, timestamp: timestamp_l } = logs[logs.length - 1];
      if (status_l === 'process') workTime += Math.min(Date.now(), day + ONE_DAY_IN_MS) - timestamp_l;

      if (logs.length > 1) {
        let i = 0;

        while (i + 1 < logs.length) {
          const { status: status_p, timestamp: timestamp_p } = logs[i];
          const { status: status_n, timestamp: timestamp_n } = logs[i + 1];

          if (status_p === 'process' && status_n !== 'process') workTime += timestamp_n - timestamp_p;

          i++;
        }
      }
    }
  }

  return workTime;
};

const oneDayClosedTasks = (framedLogs, day) => {
  return framedLogs?.filter(({ timestamp }) => ONE_DAY_IN_MS > timestamp - day >= 0)?.some(({ status }) => status === 'done') ? 1 : 0;
}

// const payload = computed(() => tasksWithFramedLogs(tasks.value, edge.from, edge.to));
const payload = computed(() => {

  const framedLogsOfAllTasksOfTheSelectedUser = tasksWithFramedLogs(tasks.value, edge.from, edge.to) ?? []

  let start = toMs(edge.from);
  const end = toMs(edge.to);

  const _payload = [];

  while (start <= end) {
    let mins = (framedLogsOfAllTasksOfTheSelectedUser.reduce((prev, curr) => { prev + oneDayWorkTimeFromFramedLogs(curr, start) }, 0) ?? 0) / (1000 * 60);

    const work_time = mins ?  `${Math.floor(mins / 60)}ч ${Math.floor(mins % 60)}мин` : 0;

    const closed_tasks = framedLogsOfAllTasksOfTheSelectedUser.reduce((prev, curr) => { prev + oneDayClosedTasks(curr, start) }, 0) ?? 0

    _payload.push({ day: start, work_time, closed_tasks }); // Fix

    start += ONE_DAY_IN_MS; // next day
  }

  return _payload;
});

const fields = [
  { label: 'Day', key: 'day' },
  { label: 'Затраченное время', key: 'work_time' },
  { label: 'Количество закрытых задач', key: 'closed_tasks' },
];

await (async () => {
  tasks.value = await $.tasks({ pipeline_id: selection.funnel, user_id: selection.user })
})();

</script>

<template>
  <!-- <pre>
    {{ JSON.stringify(payload, null, 1) }}
    {{ JSON.stringify(selection, null, 1) }}
  </pre> -->

  <Table
    :fields="fields"
    :items="payload"
    :actions="false"
  >
    <template #td-day="{ value }" >
      {{ new Date(value).getDate() }} {{ ruMonths[new Date(value).getMonth()] }}
    </template>
    
    <template #td-work_time="{ value }" >
      {{ value }}
    </template>
    
    <!-- 
      <template #td-closed_tasks="{ value }" >
        {{ value }}
      </template>
    -->
  </Table>
</template>
