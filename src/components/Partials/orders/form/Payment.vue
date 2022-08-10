<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Table from '@/Layout/Table.vue';
import service from '~/services/orders/payment';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter();

const { drop } = useConfirmDialog();

const { render } = service();

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
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>Добавить оплату
        </Button>
      </div>

      <!-- Confirm if there is an id otherwise don't confirm -->
      <Table
        :fields="fields"
        :items="[]"
        @delete="(id) => drop(() => void(id))"
        @edit="(id) => void(id)"
      >
        <!-- Body -->

        <template #td-client="{ item }" > {{ item }} </template>

        <template #td-payment_method="{ value }" > {{ { value } }} </template>

        <template #td-comment="{ value }" > {{ value }} </template>

        <template #td-created_at="{ value }" > {{ value }} </template>

        <!-- ****** -->
      </Table>
    </div>
</template>
