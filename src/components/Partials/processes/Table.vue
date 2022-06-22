<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import form from '~/services/processes/form';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes';

const { state, load, drop } = store;

const { render } = form();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Количество задач', key: 'tasks_count' },
  { label: 'Дата создания', key: 'created_at' },
];

await load();

</script>

<template>

    <Table
        :fields="fields"
        :items="state.raw"
        @delete="drop"
        @edit="render"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link :href="{ name: 'Process', params: {id} }"> {{ value }} </Link>
        </template>

        <template #td-tasks_count="{ value }" >
            <Badge :point="true" color="blue">
              {{ value ?? '0' }} задач
            </Badge>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>

</template>
