<script setup>
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/orders/payment';
import store from '~/store/clients';
import departmentStore from '~/store/departments';
import index from '~/services/orders/form';

const { current } = departmentStore;

const { fill, options: clientOptions, reset } = store;

const { invoice, atMounted } = service();
const { fields, setOrder } = index();

// await Promise.all([setOrder(route.params.id), atMounted(), (async () => { reset(); await fill({ department_id: current.value }); })()]).then(() => {
//   console.log(fields);
// });
await Promise.all([setOrder(), atMounted(), (async () => { reset(); await fill({ department_id: current.value }); })()]); 

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
          :disabled="true"
        />

        <Select
          label="Состав оплаты"
          :options="options"
          :required="true"
          :disabled="true"
        />
        <!-- v-model="invoice.payment_method" -->

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
