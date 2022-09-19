<script setup>
import { RefreshIcon } from '@heroicons/vue/outline';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import form from '~/services/finances/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/finances/finances';
import service from '~/services/finances/index';
import Table from '@/Layout/Table.vue';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers'
import $ from '~/helpers/fetch'
import { shallowReactive } from '@vue/reactivity';

let { render, typesMapper, finance_color_map } = form();

const { fetchFinances } = service();

const { state, drop: dropFinance } = store;

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Заказ-наряд', key: 'order' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Тип операции', key: 'operation_type' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата создания', key: 'created_at' },
];

await (async () => {
    const {success, operation_types, payment_types} = await $({key: 'finances/types'});
    if(success){ typesMapper.value = {operations: operation_types, payments: payment_types}; }
})()

await fetchFinances(true);

const payment_status_map = {
  wait: { color: 'yellow', label: 'Ожидает' },
  paid: { color: 'green', label: 'оплаченный' },
  fail: { color: 'red', label: 'Отменено' },
};

</script>

<template>
    <Table
        @bottom-touched="()=>fetchFinances()"
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

        <template #td-order="{ value }" >
            <Link :href="{ name: 'OrderEdit', params: { id: value?.id ?? '0' } }" :disabled="!value?.id">
                {{ value?.id ? `#${generateShapedIdfromId(value?.id)}` : '_' }}
            </Link>
        </template>

        <template #td-sum="{ value }" >
            <span class="font-bold" >{{ value }}  ₽</span>
        </template>

        <template #td-operation_type="{ value }" >
            <Badge :point="true" :color="tasksColorMap[finance_color_map[value]]?.color">
                {{ typesMapper.operations[value] }}
            </Badge>
        </template>
 
        <template #td-status="{ item: { status } }" >
            <span class="flex items-center" >
                <button class="payment_status" data-tooltip="Проверить статус" >
                    <RefreshIcon class="h-4 w-4" />
                </button>
                <Badge :point="true" :color="payment_status_map[status ?? 'wait'].color" >
                    {{ payment_status_map[status ?? 'wait'].label }}
                </Badge>
            </span>
        </template>
 
        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] }}
        </template>
        <!-- ****** -->
    </Table>
</template>

<style scoped >
.payment_status {
    position: relative;
}

.payment_status::before {
    content: attr(data-tooltip);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 5px;
    color: white;
    padding: 3px 6px;
    left: -300%;
    bottom: 150%;
    display: none;
}

.payment_status:hover::before {
    display: block;
}
</style>
