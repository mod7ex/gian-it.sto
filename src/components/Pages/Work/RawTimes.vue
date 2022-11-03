<script setup>
import { computed, shallowRef } from 'vue';
import service from '~/services/tasks/worker';
import { ruMonths } from '~/helpers';
import Table from '@/Layout/Table.vue';
import $ from '~/helpers/fetch.js';

const { edge, selection } = service();

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const tasks = shallowRef();

const logStageId = (log) => log?.data?.pipelines?.filter(({ pipeline_id }) => pipeline_id == selection.funnel)[0]?.stage_id;

const toMs = (v) => new Date(v)?.getTime();

const msToDayOfMonth = (v) => new Date(v).getDate();

const logsByDay = (logs, day) => {
  day = msToDayOfMonth(day);

  return logs?.filter(({ timestamp }) => msToDayOfMonth(timestamp) === day) ?? [];
};

/**
 * 
 * this function takes only the logs of a task, that were recorded from <from> to <to>
 * and shapes them out for better usage, just think of framedLogs as a task
 * @param {*} task 
 * @param {*} from 
 * @param {*} to 
 */
const taskFramedLogs = (task, from, to) => {
  const start = toMs(from);
  const end = toMs(to);

  const filterer = ({ created_at, type }) => ((start <= toMs(created_at) <= end) && (type == 'task_status' || type === 'task_created'));

  return task?.logs?.filter(filterer).map(({ created_at, data, type }) => {
    const stage_id = logStageId({ data });
    const status = data?.status;
    const timestamp = toMs(created_at);

    return { timestamp, status, type, stage_id }; // shape the log (we only care about these things)
  }) ?? [];
};

/**
 * frame all the tasks <logs>
 */
const tasksWithFramedLogs = (v, from, to) => v?.map((task) => taskFramedLogs(task, from, to));

/**
 * the most complicated function
 * @param framedLogs {*} { timestamp, status, type, stage_id }[], can also mean a task
 * @param day {*} in ms
 */
const oneDayWorkTimeFromFramedLogs = (framedLogs, day) => {
  let workTime = 0;

  if (framedLogs?.length) {
    // sort & filter only logs recorded in <day>
    const logs = logsByDay(framedLogs.sort((a, b) => a.timestamp - b.timestamp), day);

    if (logs.length) {
      // worker didn't pause or finish the task the starting of the day
      const { status: status_f, timestamp: timestamp_f } = logs[0];
      if (status_f !== 'process' && status_f !== 'wait') workTime += timestamp_f - day;

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

const oneDayClosedTasks = (framedLogs, day) => { return logsByDay(framedLogs, day)?.some(({ status }) => status === 'done') ? 1 : 0; }

const payload = computed(() => {

  const tasksFramedLogs = tasksWithFramedLogs(tasks.value, edge.from, edge.to) ?? []

  let start = toMs(edge.from);
  const end = toMs(edge.to);

  const _payload = [];

  while (start <= end) {
    let mins = tasksFramedLogs.reduce((prev, curr) => (prev + oneDayWorkTimeFromFramedLogs(curr, start)), 0);
    mins = (mins ?? 0) / (1000 * 60);

    const work_time = mins ?  `${Math.floor(mins / 60)}ч ${Math.floor(mins % 60)}мин` : 0;

    const closed_tasks = tasksFramedLogs.reduce((prev, curr) => (prev + oneDayClosedTasks(curr, start)), 0) ?? 0

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

await (async () => { tasks.value = await $.tasks({ pipeline_id: selection.funnel, user_id: selection.user }) })();

</script>

<template>
 
<!-- 
  <pre>
    {{ JSON.stringify(tasksWithFramedLogs(tasks, edge.from, edge.to), null, 1) }}
    {{ JSON.stringify(payload, null, 1) }}
  </pre>
-->
 

      <div>
      <small><b>NB</b> : в один день, даже если задача закрывалась много раз, засчитывается только один раз</small>
      <br>
      <small><b>NB</b> : если другой пользователь играл с вашими задачами, здесь будет отображаться, что вы работали над этими задачами, даже если вы их не трогали</small>
  
      <Table
        :fields="fields"
        :items="payload"
        :actions="false"
      >
        <template #td-day="{ value }" >
          {{ msToDayOfMonth(value) }} {{ ruMonths[new Date(value).getMonth()] }}
        </template>
        
        <template #td-work_time="{ value }" >
          {{ value }}
        </template>
        
        <template #td-closed_tasks="{ value }" >
          {{ value }}
        </template>
      </Table>
    </div>
</template>
