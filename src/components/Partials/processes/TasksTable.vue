<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import form from '~/services/processes/why-form';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/tasks';
import useAppRouter from '~/composables/useAppRouter'

let {route} = useAppRouter()

const { state, load, drop } = store;

const { render } = form();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Воронка', key: 'pipeline' },
  { label: 'Порядок', key: 'order' },
  { label: 'Ответственная роль', key: 'user' },
  { label: 'Дата создания', key: 'created_at' },
];

await load(route.params.id);

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
            <Link @click="() => render(id)"> {{ value }} </Link>
        </template>

        <template #td-pipeline="{ value }" >
          <Badge :point="true" :color="blue">
            {{ value }}
          </Badge>
        </template>

        <template #td-order="{ value }" >
            {{ value }}
        </template>

        <template #td-user="{ value }" >
            {{ value }}
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
