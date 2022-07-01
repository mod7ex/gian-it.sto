<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/pipelines/index';
import Table from '@/Layout/Table.vue';
import form from '~/services/funnels';

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Тип', key: 'type' },
  { label: 'Дата создания', key: 'created_at' },
];

const { drop } = useConfirmDialog();

const { render } = form();

const { state, load, drop: dropFunnel } = store;

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropFunnel(id))"
        @edit="(id) => render(id)"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link :href="{name: 'Stages', params: { id }}" >{{ value }}</Link>
        </template>

        <template #td-type="{ value }" >
            <Badge :point="true" color="blue">{{ value }}</Badge>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
