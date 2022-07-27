<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/orders/stages';
import Table from '@/Layout/Table.vue';
import form from '~/services/orders/stages';

const { state, load, drop: dropStage } = store;

await load();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Цвет', key: 'color' },
  { label: 'Дата создания', key: 'created_at' },
];

const { drop } = useConfirmDialog();

const { render } = form();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropStage(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => render(id)">{{ value }}</Link>
        </template>

        <template #td-color="{ value }" >
            <div class="w-9 h-9 border shadow-sm rounded-full" :style="{background: value}"></div>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
