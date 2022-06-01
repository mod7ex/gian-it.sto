<script setup>
import Link from '@/UI/Link.vue';
import carMarkForm from '~/services/cars/carMarkForm';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import Table from '@/Layout/Table.vue';
import store from '~/store/cars/marks';

const { state, load, drop: dropMark } = store;

const { drop } = useConfirmDialog();

const { setModalVisibility } = carMarkForm();

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
        @edit="(id) => setModalVisibility(true, id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
        </template>
        <!-- ****** -->
    </Table>
</template>
