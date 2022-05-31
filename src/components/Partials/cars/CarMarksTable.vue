<script setup>
import Link from '@/UI/Link.vue';
import carMarkForm from '~/services/cars/carMarkForm';
import carMarksService from '~/services/cars/carMarks';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import Table from '@/Layout/Table.vue';

const { drop } = useConfirmDialog();

const { setModalVisibility } = carMarkForm();

const fields = [
  { label: 'Название', key: 'name' },
];

const {
  rawCarMarks,
  fetchCarMarks,
  dropCarMark,
} = carMarksService();

await fetchCarMarks();

</script>

<template>
    <Table
        :fields="fields"
        :items="rawCarMarks"
        @delete="(id) => drop(() => dropCarMark(id))"
        @edit="(id) => setModalVisibility(true, id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
        </template>
        <!-- ****** -->
    </Table>
</template>
