<script setup>
import Link from '@/UI/Link.vue';
import Avatar from '@/UI/Avatar.vue';
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers'
import service from '~/services/tasks/worker';

const { fetchTasks, state } = service();

const fields = [
  { label: 'Заказ-наряд', key: 'order' },
  { label: 'Название', key: 'name' },
  { label: 'Ответственный', key: 'author' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата создания', key: 'created_at' },
  { label: 'Крайний срок', key: 'deadline_at' },
];

await fetchTasks(true);

</script>

<template>

  <Table
      @bottom-touched="()=>fetchTasks()"
      :fields="fields"
      :items="state.raw"
      :noEdit="() => true"
      :noDelete="() => true"
      :actions="false"
  >
      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link :href="{name: 'WorkerTask', params: { id }}" >{{ value }}</Link>
      </template>

      <template #td-order="{ value }" >
        <Link :disabled="true" :href="{name: 'OrderEdit', params: {id: value?.id}}" >#{{ generateShapedIdfromId(value?.id) }}</Link>
      </template>

      <template #td-author="{ value }" >
          <Avatar
            :title="`${value.name} ${value.surname}`"
            :subtitle="value.office_position"
            :image="value.avatar"
          />
      </template>

      <template #td-status="{ value }" >
          <Badge :point="true" :color="tasksColorMap[value]?.color">{{ tasksColorMap[value]?.label }}</Badge>
      </template>

      <template #td-created_at="{ value }" >
          {{ value.split(' ')[0] }}
      </template>

      <template #td-deadline_at="{ value }" >
          {{ value }}
      </template>
      <!-- ****** -->
  </Table>

</template>
