<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/cars/carModelForm';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/cars/models';

import Table from '@/Layout/Table.vue';

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Марка', key: 'car_mark' },
];

const { drop } = useConfirmDialog();

const { render } = form();

const { state, load, drop: dropCarModel } = store;

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropCarModel(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => render(id)">{{ value }} </Link>
        </template>

        <template #td-car_mark="{ value }" >
            {{ value?.name }}
        </template>
        <!-- ****** -->
    </Table>
</template>
