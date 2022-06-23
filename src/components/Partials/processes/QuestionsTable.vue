<script setup>
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { state, load, drop: dropQuestion } = store;
const { redirectTo } = useAppRouter();

const fields = [
  { label: 'Название', key: 'question' },
  { label: 'Дата создания', key: 'created_at' },
];

const edit = async (id) => {
  await redirectTo({ name: 'DiagnosticCardEdit', params: { id } });
};

await load();

</script>

<template>
    <Table
        :fields="fields"
        :items="state.raw"
        @delete="(id)=>drop(()=>dropQuestion(id))"
        @edit="edit"
    >
        <!-- Body -->
        <template #td-question="{ value, item: {id} }" >
            <Link @click="() => edit(id)"> {{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
