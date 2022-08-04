<script setup>
import Link from '@/UI/Link.vue';
import form from '~/services/cars/carMarkForm';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import Table from '@/Layout/Table.vue';
import store from '~/store/cars/marks';

const { state, fill, drop: dropMark, reset } = store;

const { drop } = useConfirmDialog();

const { render } = form();

const fields = [ { label: 'Название', key: 'name' }, ];

const fetchMarks = async (bool = false) => {
  if (bool) reset();
  await fill();
};

await fetchMarks(true);

</script>

<template>
    <Table
        @bottom-touched="() => fetchMarks()"
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
