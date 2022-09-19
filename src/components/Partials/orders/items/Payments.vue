<script setup> 
import Table from '@/Layout/Table.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import service from '~/services/orders/payment';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import $ from '~/helpers/fetch'
import { onScopeDispose } from '@vue/reactivity';

const { drop } = useConfirmDialog();

let { render, state, fetchPayments, options, dropPayment, pay, clearMemo, typesMapper } = service();

const paymentWaysMapper = options.reduce((obj, item) => ({ ...obj, [item.value]: item.label }), {});

const fields = [
  { label: 'Плательщик', key: 'client' },
  { label: 'Способ оплаты', key: 'type' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Дата создания', key: 'created_at' },
  { label: 'Статус', key: 'status' },
];

await (async () => {
    const {success, operation_types, payment_types} = await $({key: 'finances/types'});
    if(success){ typesMapper.value = {operations: operation_types, payments: payment_types}; }
    console.log(typesMapper.value)
})()

await fetchPayments();

onScopeDispose(clearMemo)

</script>

<template>
  <Table
    :fields="fields"
    :items="state.raw"
    @edit="(id) => render(id)"
    @delete="(id) => drop(() => dropPayment(id))"
    :noEdit="({ status }) => status === 'done'"
  >
    <template #td-client="{ value }" >
      <Link :href="{ name: 'EditClient', params: { id: value?.id } }" >
        {{ `${value?.name ?? ''} ${value?.surname ?? ''} ${value?.middlename ?? ''}` }}
      </Link>
    </template>

    <template #td-type="{ value }" > {{ paymentWaysMapper[value] }} </template>

    <template #td-sum="{ value }" > {{ value }} ₽ </template>

    <template #td-comment="{ value }" > {{ value }} </template>

    <template #td-created_at="{ value }" > {{ value }} </template>

    <template #td-status="{ value, item: { id, order: { id: order_id }} }" >
      <Link v-if="value === 'wait'" @click="() => pay(id, order_id)" > Оплатить </Link>
      <Badge color="green" :point="true" v-else > Оплаченный </Badge>
    </template>
  </Table>
</template>
