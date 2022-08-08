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

const { storages, fill, reset, drop: dropStorage } = store;

const fetchStorages = async (bool = false) => {
  if (bool) reset();
  await fill({ department_id: current.value });
};

await fetchStorages(true);

</script>

<template>
    <Table
        @bottom-touched="() => fetchStorages()"
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
