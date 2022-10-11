<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import form from '~/services/finances/form';
import $ from '~/helpers/fetch';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/finances/finances';
import service from '~/services/finances/index';
import Table from '@/Layout/Table.vue';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers';
import VPay from '@/Partials/finances/Pay.vue'

const { render, typesMapper, finance_color_map } = form();

const { fetchFinances } = service();

const { state, drop: dropFinance, updateStatus } = store;

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Заказ-наряд', key: 'order' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Оплаченная сумма (₽)', key: 'paid_sum' },
  { label: 'Тип операции', key: 'operation_type' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата создания', key: 'created_at' },
];

await (async () => {
    const {success, operation_types, payment_types} = await $({key: 'finances/types'});
    if(success){ typesMapper.value = {operations: operation_types, payments: payment_types}; }
})();

await fetchFinances(true);

const wrapper = async (v) => { await v(); }

const disableEdit = (finance) => {
    if(finance.operation_type == 'buy') return true;
    if(finance.operation_type == 'buyReturn') return finance.status == 'inProgress' || finance.status == 'ready'
    return false
}

</script>

<template>
    <Table
        @bottom-touched="()=>fetchFinances()"
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropFinance(id))"
        @edit="(id) => render(id)"
        :noEdit="disableEdit"
    >
        <template #th-sum="{ label }" >
            <span class="font-bold" >{{ label }}</span>
        </template>

        <template #td-name="{ value, item }" >
            <Link :disabled="disableEdit(item)" @click="() => render(item.id)">{{ value }} </Link>
        </template>

        <template #td-order="{ value }" >
            <Link :href="{ name: 'OrderEdit', params: { id: value?.id ?? '0' } }" :disabled="!value?.id">
                {{ value?.id ? `#${generateShapedIdfromId(value?.id)}` : '_' }}
            </Link>
        </template>

        <template #td-sum="{ value }" >
            <span class="font-bold" >{{ value }}  ₽</span>
        </template>

        <template #td-paid_sum="{ item: { order } }" >
            <span class="font-bold" >{{ order?.total_paid_sum ?? '_' }}  ₽</span>
        </template>

        <template #td-operation_type="{ value }" >
            <Badge :point="true" :color="tasksColorMap[finance_color_map[value]]?.color">
               {{ typesMapper.operations[value] }}
            </Badge>
            {{ value }}
        </template>

        <template #td-status="{ value, item: { id } }" >
            <v-pay :id="id" :status="value" :cb="updateStatus" :paymentWrapper="wrapper" />
        </template>

        <template #td-created_at="{ value }" >
            {{ value?.split(' ')[0] }}
        </template>
    </Table>
</template>

 