<script setup>
import Link from '@/UI/Link.vue';
import carModelForm from '~/services/cars/carModelForm';
import carModelsService from '~/services/cars/carModels';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import Table from '@/Layout/Table.vue';

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Марка', key: 'car_mark' },
];

const { drop } = useConfirmDialog();

const { setModalVisibility } = carModelForm();

const { rawCarModels, fetchCarModels, dropCarModel } = carModelsService();

await fetchCarModels();

</script>

<template>
    <Table
        :fields="fields"
        :items="rawCarModels"
        @delete="(id) => drop(() => dropCarModel(id))"
        @edit="(id) => setModalVisibility(true, id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
        </template>

        <template #td-car_mark="{ value }" >
            {{ value?.name }}
        </template>
        <!-- ****** -->
    </Table>
</template>
