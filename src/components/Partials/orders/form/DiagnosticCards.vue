<script setup>
import { ref, watch } from 'vue';
import TasksTable from '@/Partials/tasks/Table.vue';
import useSuspense from '~/composables/useSuspense';
import useAppRouter from '~/composables/useAppRouter';
import store from '~/store/tasks';
import Preview from '@/Partials/processes/DiagnosticCardPreview.vue';
import $ from '~/helpers/fetch';

const { state } = store;

const dc_template = ref();
const current = ref();
const pending = ref(false);

watch(current, async (v) => {
  const dk_task = state.raw.find(({ is_map, id }) => is_map && id === v);
  const { map_id } = dk_task.task_map;
  if (!map_id) return;
  pending.value = true;
  dc_template.value = await $.map(map_id);
  pending.value = false;
  console.log(dc_template.value);
});

const SuspenseArea = useSuspense();
const { route } = useAppRouter();
</script>

<template>
    <div class="px-2">

      <suspense-area >
        <tasks-table :is_map="true" :order_id="route.params.id" v-model="current" />
      </suspense-area>

      <div class="my-9" >
        <p v-if="pending" class="text-center" >Загрузка шаблона...</p>
        <preview v-if="dc_template && !pending" :fields="dc_template.data ?? []" :dc_template="dc_template" />
      </div>

    </div>
</template>
