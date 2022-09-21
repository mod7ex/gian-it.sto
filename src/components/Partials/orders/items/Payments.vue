<script setup>
import { onScopeDispose } from 'vue';
import Table from '@/Layout/Table.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import service from '~/services/orders/payment';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import VPay from '@/Partials/finances/Pay.vue'
import $ from '~/helpers/fetch';
import store from '~/store/orders/payment'

const { setStatus } = store

const { drop } = useConfirmDialog();

const { render, state, fetchPayments, dropPayment, pay, clearMemo, typesMapper } = service();

const fields = [
  { label: 'Плательщик', key: 'client' },
  { label: 'Способ оплаты', key: 'payment_type' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Дата создания', key: 'created_at' },
  { label: 'Статус', key: 'status' },
];

await (async () => {
  const {success, operation_types, payment_types} = await $({key: 'finances/types'});
  if(success){ typesMapper.value = {operations: operation_types, payments: payment_types}; }
  console.log(typesMapper.value);
})();

await fetchPayments();

onScopeDispose(clearMemo);

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

    <template #td-payment_type="{ value }" >
      {{ typesMapper.payments[value] }}
    </template>

    <template #td-sum="{ value }" > {{ value }} ₽ </template>

    <template #td-comment="{ value }" > {{ value }} </template>

    <template #td-created_at="{ value }" > {{ value.split(' ')[0] }} </template>

    <template #td-status="{ value, item }" >
      <v-pay :id="item.id" :status="value" resource="payment" :cb="setStatus" :paymentWrapper="(v) => pay(item, v)" />
    </template>
  </Table>
</template>
