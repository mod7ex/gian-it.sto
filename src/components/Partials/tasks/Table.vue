<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import store from '~/store/tasks';
import Table from '@/Layout/Table.vue';
import service from '~/services/tasks';

const { fetchTasks, removeTask, edit } = service();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Ответственный', key: 'user' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата создания', key: 'created_at' },
  { label: 'Крайний срок', key: 'deadline' },
  { label: 'Заказ-наряд', key: 'order' },
];

const { state } = store;

await fetchTasks(true);

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="removeTask"
        @edit="edit"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link :href="{name: 'Task', params: { id }}" >{{ value }} </Link>
        </template>

        <template #td-user="{ value }" >
            <Avatar
              :title="value.name"
              :subtitle="value.role"
              :image="value.image"
            />
        </template>

        <template #td-status="{ value }" >
            <Badge :point="true" :color="green">
              {{ value }}
            </Badge>
        </template>

        <template #td-created_at="{ value }" >
            {{ value }}
        </template>

        <template #td-deadline="{ value }" >
            {{ value }}
        </template>

        <template #td-order="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>

</template>
