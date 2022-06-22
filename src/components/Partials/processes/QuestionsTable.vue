<script setup>
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';

const { state, load, drop } = store;
const { redirectTo } = useAppRouter();

const fields = [
  { label: 'Название', key: 'name' },
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
        @delete="drop"
        @edit="edit"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id} }" >
            <Link @click="() => edit(id)"> {{ value }} </Link>
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
