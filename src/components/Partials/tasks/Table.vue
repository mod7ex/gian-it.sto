<script setup>
import { CogIcon } from '@heroicons/vue/outline'
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import store from '~/store/tasks';
import Table from '@/Layout/Table.vue';
import service from '~/services/tasks';
import { generateShapedIdfromId, tasksColorMap, trimExact } from '~/helpers';
import { canTasks, userHasAtLeastOnePermission } from '~/lib/permissions';
import useAppRouter from '~/composables/useAppRouter';

const { isThePage } = useAppRouter('OrderEdit')

const props = defineProps({
  order_id: {
    type: [String, Number],
    default: undefined,
  },
  is_map: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
});

defineEmits(['update:modelValue']);

const { fetchTasks, removeTask, edit } = service();

const fields = [
  { label: 'Название', key: 'name' },
  // ...[props.order_id ? { label: 'Тип', key: 'type' } :  new Array()],
  { label: 'Тип', key: 'type' },
  { label: 'Bоронка-этап', key: 'funnel_etap' },
  { label: 'Ответственный', key: 'user' },
  { label: 'Статус', key: 'status' },
  { label: 'Крайний срок', key: 'deadline_at' },
  ...[!props.order_id ? { label: 'Заказ-наряд', key: 'order' } : new Array()],
  { label: 'Дата создания', key: 'created_at' },
];

if (!props.order_id) { fields.push(); }

fields.push();

const { state, options } = store;

await fetchTasks(true, props.order_id, props.is_map ? 1 : undefined);

const createFunnelEtapeMapHTML = (payload) => payload.reduce((prev, { pipeline, stage }) => { return prev + `<span>&#8226;</span> ${pipeline.name} - ${stage.name}<br />` }, '');

</script>

<template>

  <div v-if="props.is_map">
    <!-- <div class="flex"> -->
      <div class="mx-auto max-w-6xl p-3 bg-gray-50 flex flex-wrap justify-center items-center shadow-inner rounded-md">
        <p v-if="options.length === 0">Нет диагностической карты</p>
        <Badge
          @click="$emit('update:modelValue', item.value)"
          v-show="item.value != modelValue"
          v-for="item in options"
          :key="item.value"
          :point="true"
          color="blue"
          class="m-2 p-1 cursor-pointer hover:shadow-lg shadow transition-shadow duration-300 ease-out"
        > {{ item.label }} </Badge>
      </div>
    <!-- </div> -->
  </div>

  <Table
    v-else
    @bottom-touched="()=>fetchTasks(false, props.order_id)"
    :fields="fields"
    :items="state.raw"
    @delete="(v) => removeTask(v, !isThePage)"
    @edit="edit"
    :noEdit="(item) => !canTasks(item, 'update')"
    :noDelete="(item) => !canTasks(item, 'delete')"
    :actions="userHasAtLeastOnePermission(['update tasks', 'delete tasks'])"
    class="relative"
  >
    <!-- :actions="!canTasks(item, 'update') && !canTasks(item, 'delete')" -->
    <!-- Body -->
    <template #td-name="{ value, item: {id} }" >
      <span :data-tooltip="value" class="tooltip" >
        <Link :href="{name: 'Task', params: { id }}">{{ trimExact(value) }}</Link>
      </span>
    </template>

    <template #td-type="{ item: {is_map} }" >
      <Badge :point="true" :color="is_map ? 'green' : 'purple'">
        {{ is_map ? 'Диагностическая карта' : 'Задачa' }}
      </Badge>
    </template>

    <template #td-user="{ value }" >
      <Avatar
        :title="`${value?.name ?? ''} ${value?.middle_name ?? ''}`"
        :subtitle="value?.office_position ?? ''"
        :image="value?.avatar"
      />
    </template>

    <template #td-status="{ value }" >
        <Badge :point="true" :color="tasksColorMap[value].color">{{ tasksColorMap[value].label }}</Badge>
    </template>

    <template #td-funnel_etap="{ item }" >
      <!-- <span :data-tooltip="createFunnelEtapeMapHTML(item.pipelines)" class="funnel-etap-map relative" > 
        <p class="absolute -top-10 -left-12" v-html="createFunnelEtapeMapHTML(item.pipelines)" ></p>
        <CogIcon class="w-6 h-6" />
      </span> -->
      <span :data-tooltip="createFunnelEtapeMapHTML(item.pipelines)" class="funnel-etap-map" > 
        <p v-html="createFunnelEtapeMapHTML(item.pipelines)"/>
      </span>
    </template>

    <template #td-created_at="{ value }" >
        {{ value.split(' ')[0] }}
    </template>

    <template #td-deadline_at="{ value }" >
        {{ value }}
    </template>

    <template #td-order="{ value }" >
        <Link :disabled="value == null" :href="{name: 'OrderEdit', params: {id: value?.id ?? 0}}" >
          {{ value ? `#${generateShapedIdfromId(value?.id)}` : '_' }}
        </Link>
    </template>
    <!-- ****** -->
  </Table>

</template>

<style>
/* 
.funnel-etap-map {
  z-index: 100;
}
.funnel-etap-map p {
  visibility: hidden;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  color: white;
  padding: 3px 6px;
  transition: opacity 1s ease-out;
  z-index: 100;
  cursor: pointer;
}

.funnel-etap-map:hover p {
  visibility: visible;
  opacity: 1;
} */

</style>