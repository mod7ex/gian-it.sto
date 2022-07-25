<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import store from '~/store/storage/products'

import service from '~/services/orders/storage-requests';

const { items, atMounted, products_request } = service();
const { load, options } = store;

await Promise.all([load(), atMounted()]);

const statusOptions = [
  {label: 'Ожидает', value: 'wait'},
  {label: 'Обработка', value: 'process'},
  {label: 'Приостановлено', value: 'pause'},
  {label: 'Готово', value: 'done'},
  {label: 'Отменено', value: 'cancel'},
]

</script>

<template>
    <div>

        <Select
          label="Товар"
          :options="options"
          :required="true"
          v-model="products_request.product_id"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Input
          label="Сумма"
          type="number"
          :required="true"
          v-model="products_request.sum"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Select
          label="Статус"
          :options="statusOptions"
          :required="true"
          v-model="products_request.status"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <TextArea
          label="Комментарий"
          :required="true"
          v-model="products_request.comment"
          class="m-3 sm:col-span-6 col-span-12"
        />

    </div>
</template>
