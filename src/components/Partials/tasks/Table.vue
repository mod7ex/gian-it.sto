<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import store from '~/store/tasks';
import Table from '@/Layout/Table.vue';
import service from '~/services/tasks';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers'

const { fetchTasks, removeTask, edit } = service();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Ответственный', key: 'author' },
  { label: 'Статус', key: 'status' },
  { label: 'Крайний срок', key: 'deadline_at' },
  { label: 'Заказ-наряд', key: 'order' },
  { label: 'Дата создания', key: 'created_at' },
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

        <template #td-author="{ value }" >
            <Avatar
              :title="`${value.name} ${value.surname}`"
              :subtitle="value.office_position"
              :image="value.avatar"
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
            <Link :href="{name: 'OrderEdit', params: {id: value.id}}" >#{{ generateShapedIdfromId(value.id) }}</Link>
        </template>
        <!-- ****** -->
    </Table>

</template>
