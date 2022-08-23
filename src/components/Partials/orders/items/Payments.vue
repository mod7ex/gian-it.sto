<script setup> 
import Table from '@/Layout/Table.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import service from '~/services/orders/payment';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { render, state, fetchPayments, paymentWaysOptions, dropPayment, pay, clearMemo } = service();

const paymentWaysMapper = paymentWaysOptions.reduce((obj, item) => ({ ...obj, [item.value]: item.label }), {});

const fields = [
  { label: 'Плательщик', key: 'client' },
  { label: 'Способ оплаты', key: 'type' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Дата создания', key: 'created_at' },
  { label: 'Статус', key: 'status' },
];

await fetchPayments();

clearMemo()

</script>

<template>
  <Table
    :fields="fields"
    :items="state.raw"
    @edit="(id) => render(id)"
    @delete="(id) => drop(() => dropPayment(id))"
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
