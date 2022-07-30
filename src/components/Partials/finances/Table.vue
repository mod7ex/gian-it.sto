<script setup>
import { computed } from 'vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import form from '~/services/finances/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/finances/finances';
import service from '~/services/finances/index';
import useIntersectionObserver from '~/composables/useIntersectionObserver';
import Table from '@/Layout/Table.vue';

const { render } = form();

const { fetchFinances } = service();

const { state, drop: dropFinance } = store;

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Тип операции', key: 'operation_type' },
  // { label: 'Oтдел', key: 'department' },
  { label: 'Дата создания', key: 'created_at' },
];

const emit = defineEmits(['bottomTouched']);

const { pixel, container } = useIntersectionObserver(() => {
  emit('bottomTouched');
}, computed(() => state.raw.length > 0));

await fetchFinances(true);

</script>

<template>
    <div :ref="(v)=>container = v">
        <Table
            :fields="fields"
            :items="state.raw"
            @delete="(id) => drop(() => dropFinance(id))"
            @edit="(id) => render(id)"
        >
            <!-- Header -->
            <template #th-sum="{ label }" >
                <span class="font-bold" >{{ label }}</span>
            </template>

            <!-- Body -->
            <template #td-name="{ value, item: {id} }" >
                <Link @click="() => render(id)">{{ value }} </Link>
            </template>

            <template #td-sum="{ value }" >
                <span class="font-bold" >{{ value }}  ₽</span>
            </template>

            <template #td-operation_type="{ value }" >
                <Badge :point="true" :color="(value === 'in') ? 'green' : 'red'">
                    {{ value === 'in' ? 'Приход' : 'Расход' }}
                </Badge>
            </template>
<!-- 
            <template #td-department="{ value }" >
                {{ value?.name ?? '_' }}
            </template>
-->
            <template #td-created_at="{ value }" >
                {{ value?.split(' ')[0] }}
            </template>
            <!-- ****** -->
        </Table>

        <pixel />
    </div>
</template>
