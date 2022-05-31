<script setup>
import Link from '@/UI/Link.vue';
import service from '~/services/finances/groups';
import form from '~/services/finances/groups/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import Table from '@/Layout/Table.vue';

const { rawGroups, fetchGroups, dropGroup } = service();
const { setModalVisibility } = form();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Дата создания', key: 'created_at' },
];

await fetchGroups();

</script>

<template>
    <Table
        :fields="fields"
        :items="rawGroups"
        @delete="(id) => drop(() => dropGroup(id))"
        @edit="(id) => setModalVisibility(true, id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>
</template>
