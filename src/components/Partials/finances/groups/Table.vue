<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/finances/groups/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/finances/groups';

import Table from '@/Layout/Table.vue';

const { state, load, drop: dropGroup } = store;

const { setModalVisibility } = form();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
//   { label: 'Дата создания', key: 'created_at' },
];

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropGroup(id))"
        @edit="(id) => setModalVisibility(true, id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
        </template>

        <!--
        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        -->
        <!-- ****** -->
    </Table>
</template>
