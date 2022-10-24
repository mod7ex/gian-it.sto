<script setup>
import { computed, ref, watch } from 'vue';
import { DownloadIcon, ClockIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Spinner from '@/UI/Spinner.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import TasksTable from '@/Partials/tasks/Table.vue';
import useSuspense from '~/composables/useSuspense';
import useAppRouter from '~/composables/useAppRouter';
import store from '~/store/tasks';
import Preview from '@/Partials/processes/DiagnosticCardPreview.vue';
import $ from '~/helpers/fetch';
import { tasksColorMap } from '~/helpers';

const { state } = store;

const dc_template = ref();
const current = ref();
const dk_task = computed(() => state.raw.find(({ is_map, id }) => is_map && id === current.value));
const pending = ref(false);

watch(dk_task, async (v) => {
  const { map_id } = v.task_map;
  if (!map_id) return;
  pending.value = true;
  dc_template.value = await $.map(map_id);
  pending.value = false;
});

const SuspenseArea = useSuspense();
const { route } = useAppRouter();

const printOut = () => {
  window.print();
};

</script>

<template>
    <div class="mx-auto max-w-6xl">

      <suspense-area >
        <tasks-table :is_map="true" :order_id="route.params.id" v-model="current" />
      </suspense-area>

      <div v-if="pending" class="my-9 flex justify-center items-center" >
        <Spinner w="4" h="4" >Загрузка шаблона...</Spinner>
      </div>

      <div class="my-9" v-else >
        <div class="mb-3 flex justify-between items-center" v-if="dc_template">
          <Link class="flex" @click="e => printOut()">распечатать <DownloadIcon class="ml-6 text-blue-600 w-6 h-6" /></Link>
          <Badge
            :point="true"
            color="blue"
            class="m-2 p-1 cursor-pointer hover:shadow-lg shadow transition-shadow duration-300 ease-out"
          > {{ dk_task.name }} </Badge>
        </div>

        <div class="flex gap-3 flex-wrap justify-between items-center border-gray-300 border rounded shadow p-6 px-9 mb-3" v-if="dk_task">
            <Avatar
              :title="`${dk_task.author?.name ?? ''} ${dk_task.author?.middle_name ?? ''}`"
              :subtitle="dk_task.author?.office_position"
              :image="dk_task.author?.avatar"
            />

            <div class="text-center">
              <p class="text-gray-600">Автомобиль</p>
              <p>{{ `${dk_task?.order.car?.car_model?.car_mark?.name ?? ''} ${dk_task?.order.car?.car_model?.name ?? '_'}` }}</p>
            </div>

            <div class="text-right">
                <div class="text-sm flex items-center mb-3">
                    <ClockIcon class="w-4 h-4 mr-1"/>
                    <span class="mr-1">Крайний срок:</span>
                    <span class="text-gray-500">{{ dk_task.deadline_at }}</span>
                </div>

                <Badge :point="true" :color="tasksColorMap[dk_task.status].color">{{ tasksColorMap[dk_task.status].label }}</Badge>
            </div>
        </div>

        <preview
          v-if="dc_template"
          :task_id="dk_task.id"
          :map_answer="dk_task.map_answer"
          :fields="dc_template.data ?? []"
          :dc_template="dc_template"
          :task="dk_task"
          :disabled="true"
        />
      </div>
    </div>
</template>
