<script setup>
import Table from '@/Layout/Table.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import VPay from '@/Partials/finances/Pay.vue';
import $ from '~/helpers/fetch';
import form from '~/services/finances/form';
import service from '~/services/finances/index';
import { tasksColorMap } from '~/helpers';
import payment from '~/services/orders/payment';
import { onScopeDispose } from '@vue/reactivity';

const { drop } = useConfirmDialog();

const { render, types, typesMapper, finance_color_map, payment_types } = form();

const { state, fetchFinances, drop: dropPayment } = service();

let { pay,typesMapper: v } = payment(typesMapper);

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Сумма (₽)', key: 'sum' },
  { label: 'Тип операции', key: 'operation_type' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата создания', key: 'created_at' },
];

await (async () => {
  const {success, operation_types, payment_types} = await $({key: 'finances/types'});
  if(success){ typesMapper.value = {operations: operation_types, payments: payment_types}; }
})();

await fetchFinances();

onScopeDispose(() => { v = undefined; });

</script>

<template>
    <Table
      :fields="fields"
      :items="state.raw"
      @edit="(id) => render(id)"
      @delete="(id) => drop(() => dropPayment(id))"
      :noEdit="({ status }) => status === 'ready'"
    >
      <template #td-name="{ value, item: {id} }" >
          <Link @click="() => render(id)">{{ value }} </Link>
      </template>

      <template #td-sum="{ value }" >
          <span class="font-bold" >{{ value }}  ₽</span>
      </template>

      <template #td-operation_type="{ value }" >
          <Badge :point="true" :color="tasksColorMap[finance_color_map[value]]?.color">
              {{ typesMapper.operations[value] }}
          </Badge>
      </template>

      <template #td-status="{ value, item }" >
          <v-pay :id="item?.id" :status="value" :cb="updateStatus" :paymentWrapper="(v) => pay(item, v)" />
      </template>

      <template #td-created_at="{ value }" >
          {{ value?.split(' ')[0] }}
      </template>
    </Table>
</template>
