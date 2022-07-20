<script setup>
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/orders/payment';
import store from '~/store/clients';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { fill, options: clientOptions, reset } = store;

const { invoice, atMounted } = service();

await Promise.all([atMounted(), (async () => { reset(); await fill({ department_id: current.value }); })()]); 

const options = [
  { label: 'Терминал', value: 'terminal' },
  { label: 'Cсылĸа эĸвайрнинга', value: 'link' },
  { label: 'Банк', value: 'bank' },
];

</script>

<template>
    <div>
        <Select
          label="Плательщик"
          :options="clientOptions"
          v-model="invoice.client_id"
          :required="true"
        />

        <Select
          label="Способ оплаты"
          :options="options"
          :required="true"
          v-model="invoice.payment_method"
        />

        <TextArea
          label="Комментарий"
          :required="true"
          v-model="invoice.comment"
        />
    </div>
</template>
