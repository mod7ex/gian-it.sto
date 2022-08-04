<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/finances/groups/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/finances/groups';

import Table from '@/Layout/Table.vue';

const { state, load, drop: dropGroup, fill, reset } = store;

const { render } = form();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
//   { label: 'Дата создания', key: 'created_at' },
];

const fetchGroups = async (bool = false) => {
  if (bool) reset();
  await fill();
};

await fetchGroups(true);

</script>

<template>
    <Table
        @bottom-touched="() => fetchGroups()"
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropGroup(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => render(id)">{{ value }} </Link>
        </template>

        <!--
        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        -->

        <!-- ****** -->
    </Table>
</template>
