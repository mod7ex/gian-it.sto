<script setup>
import { computed, onMounted } from 'vue';
import Link from '@/UI/Link.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import store from '~/store/tasks';
import Table from '@/Layout/Table.vue';
import service from '~/services/tasks';
import DocPreview from '@/Layout/modal/DocPreview.vue';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers';
import { canTasks } from '~/lib/permissions';
import FormActions from '@/Layout/modal/FormActions.vue';

const props = defineProps({
  order_id: {
    type: [String, Number],
    default: undefined,
  },
  is_map: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    required: false
  }
});

defineEmits(['update:modelValue']);

const { fetchTasks, removeTask, edit } = service();

const fields = [
  { label: 'Название', key: 'name' },
  // ...[props.order_id ? { label: 'Тип', key: 'type' } :  new Array()],
   { label: 'Тип', key: 'type' },
  { label: 'Ответственный', key: 'user' },
  { label: 'Статус', key: 'status' },
  { label: 'Крайний срок', key: 'deadline_at' },
  ...[!props.order_id ? { label: 'Заказ-наряд', key: 'order' } :  new Array()],
  { label: 'Дата создания', key: 'created_at' }
];

if (!props.order_id) {
  fields.push();
}

fields.push();

const { state,  options, no_owner } = store;

await fetchTasks(true, props.order_id, props.is_map ? 1 : undefined);

onMounted(() => {
  console.log(no_owner.value)
})

</script>

<template>

  <div v-if="props.is_map">
    <!-- <div class="flex"> -->
      <div class="mx-auto max-w-6xl p-3 bg-gray-50 flex flex-wrap justify-center items-center shadow-inner rounded-md">
        <p v-if="options.length === 0">Нет задач</p>
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
      @delete="removeTask"
      @edit="edit"
      :noEdit="(item) => !canTasks(item, 'update')"
      :noDelete="(item) => !canTasks(item, 'delete')"
  >
      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link :href="{name: 'Task', params: { id }}" >{{ value }}</Link>
      </template>

      <template #td-type="{ item: {is_map} }" >
        <Badge :point="true" :color="is_map ? 'green' : 'purple'">
          {{ is_map ? 'Диагностическая карта' : 'Задачa' }}
        </Badge>
      </template>

      <template #td-user="{ value }" >
          <Avatar
            :title="`${value?.name ?? '_'} ${value?.surname ?? '_'}`"
            :subtitle="value?.office_position ?? '...'"
            :image="value?.avatar"
          />
      </template>

      <template #td-status="{ value }" >
          <Badge :point="true" :color="tasksColorMap[value].color">{{ tasksColorMap[value].label }}</Badge>
      </template>

      <template #td-created_at="{ value }" >
          {{ value.split(' ')[0] }}
      </template>

      <template #td-deadline_at="{ value }" >
          {{ value }}
      </template>

      <template #td-order="{ value }" >
          <Link :href="{name: 'OrderEdit', params: {id: value?.id ?? 0}}" >#{{ generateShapedIdfromId(value?.id) }}</Link>
      </template>
      <!-- ****** -->
  </Table>

<!-- 
  <Teleport to="#sto-modal-teleport">
    <Transition name="docs-modal">
      <div
        v-if="no_owner.length"
        class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50"
      >

        <div class="bg-white rounded-md p-3 mt-12 shadow-2xl">

          <div class="p-1">
            let's go
          </div>
          
          <form-actions />

        </div>

      </div>
    </Transition>
  </Teleport>
-->

</template>

<style scoped>
.docs-modal-enter-active,
.docs-modal-leave-active {
  transition: opacity 0.3s ease;
}

.docs-modal-enter-from,
.docs-modal-leave-to {
  opacity: 0;
}

</style>
