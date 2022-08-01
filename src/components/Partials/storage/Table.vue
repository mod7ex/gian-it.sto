<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/storage';
import Table from '@/Layout/Table.vue';
import form from '~/services/storage/form';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Дата создания', key: 'created_at' },
];

const { drop } = useConfirmDialog();

const { render } = form();

const { storages, load, drop: dropStorage } = store;

await load({ department_id: current.value });

</script>

<template>
    <Table
        :fields="fields"
        :items="storages"
        @delete="(id) => drop(() => dropStorage(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id, name} }" >
            <Link :href="{name: 'Storage', params: { id, name }}" >{{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>
</template>
