<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/storage/producers';
import Table from '@/Layout/Table.vue';
import form from '~/services/storage/producers/form';

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Дата создания', key: 'created_at' },
];

const { drop } = useConfirmDialog();

const { render } = form();

const { producers, load, drop: dropProducer } = store;

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="producers"
        @delete="(id) => drop(() => dropProducer(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => render(id)" >{{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>
</template>
