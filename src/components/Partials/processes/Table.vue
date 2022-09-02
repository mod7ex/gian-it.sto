<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import form from '~/services/processes/form';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes';

const { state, drop, reset, fill } = store;

const { render } = form();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Количество задач', key: 'count_tasks' },
  { label: 'Дата создания', key: 'created_at' },
];


const fetchProcesses = async (bool = false) => {
  if (bool) reset();
  await fill();
};

await fetchProcesses(true);

</script>

<template>

    <Table
        @bottom-touched="() => fetchProcesses()"
        :fields="fields"
        :items="state.raw"
        @delete="drop"
        @edit="render"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id, name} }" >
            <Link :href="{ name: 'Process', params: {id, name} }"> {{ value }} </Link>
        </template>

        <template #td-count_tasks="{ value }" >
            <Badge :point="true" color="blue">
              {{ value ?? '(Unknown)' }} задач
            </Badge>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>

</template>
