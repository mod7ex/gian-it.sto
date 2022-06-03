<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/cars/carMarkForm';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import Table from '@/Layout/Table.vue';
import store from '~/store/cars/marks';

const { state, load, drop: dropMark } = store;

const { drop } = useConfirmDialog();

const { render } = form();

const fields = [
  { label: 'Название', key: 'name' },
];

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropMark(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => render(id)">{{ value }} </Link>
        </template>
        <!-- ****** -->
    </Table>
</template>
