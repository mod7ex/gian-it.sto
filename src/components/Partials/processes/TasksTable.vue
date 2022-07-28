<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/tasks';
import useAppRouter from '~/composables/useAppRouter';

const { route, redirectTo } = useAppRouter();

const { id } = route.params;

const { state, load, drop } = store;

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Ответственная роль', key: 'role' },
  { label: 'Порядок', key: 'position' },
  { label: 'Дата создания', key: 'created_at' },
];

await load(id);

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="drop"
        @edit="(task) => redirectTo({ name: 'ProcessTaskEdit', params: { task, id } })"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id: task} }" >
            <Link :href="{ name: 'ProcessTaskEdit', params: { task, id } }"> {{ value }} </Link>
        </template>

        <template #td-role="{ value }" >
          <Badge :point="true" color="blue">
            {{ value.title }}
          </Badge>
        </template>

        <template #td-position="{ value }" >
            {{ value }}
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
