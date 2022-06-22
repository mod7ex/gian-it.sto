<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/processes/why-form';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/why';

const { state, load, drop } = store;

const { render } = form();

const fields = [
  { label: 'Название', key: 'name' },
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
            <Link @click="() => render(id)"> {{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
