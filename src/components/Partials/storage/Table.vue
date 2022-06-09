<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/storage';
import Table from '@/Layout/Table.vue';
import form from '~/services/storage/form';

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Город', key: 'city' },
  { label: 'Дата создания', key: 'created_at' },
];

const { drop } = useConfirmDialog();

const { render } = form();

const { storages, load, drop: dropStorage } = store;

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="storages"
        @delete="(id) => drop(() => dropStorage(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link :href="{name: 'Storage', params: { id }}" >{{ value }} </Link>
        </template>

        <template #td-city="{ value }" >
            {{ value }}
        </template>

        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>
</template>
