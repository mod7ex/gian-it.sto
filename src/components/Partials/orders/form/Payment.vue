<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Table from '@/Layout/Table.vue';
import service from '~/services/orders/payment';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { render, payments } = service();

const fields = [
  { label: 'Плательщик', key: 'client_id' },
  { label: 'Способ оплаты', key: 'payment_method' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Дата создания', key: 'created_at' },
];

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue" @click="() => render()">
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>Добавить работу
        </Button>
      </div>

      <Table
        :fields="fields"
        :items="payments"
        @delete="(id) => drop(() => dropDepartment(id))"
        @edit="(id) => render(id)"
      >
          <!-- Body -->

          <template #td-client="{ item }" > {{ item }} </template>

          <template #td-payment_method="{ item }" > {{ { item } }} </template>

          <template #td-comment="{ item }" > {{ item }} </template>

          <template #td-created_at="{ item }" > {{ item }} </template>

          <!-- ****** -->
      </Table>
    </div>
</template>
