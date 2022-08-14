<script setup>
import { computed } from '@vue/reactivity';
import Select from '@/UI/Select.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/orders/payment';
import departmentStore from '~/store/departments';
import index from '~/services/orders/form';

const { current } = departmentStore;

const { invoice, atMounted, paymentWaysOptions } = service();
const { rawFields, setOrder } = index();

await Promise.all([setOrder(), atMounted()]).then(() => { 
  invoice.client_id = rawFields?.client?.id;
  invoice.order_id = rawFields?.id;
});

/*

const options = [
  { label: 'Терминал', value: 'terminal' },
  { label: 'Cсылĸа эĸвайрнинга', value: 'link' },
  { label: 'Банк', value: 'bank' },
];

*/

const statusOptions = [
  { label: 'done', value: 'done' },
  { label: 'wait', value: 'wait' },
];

const clientOptions = computed(() => ({ value: rawFields?.client?.id, label: `${rawFields?.client?.name ?? ''} ${rawFields?.client?.surname ?? ''} ${rawFields?.client?.middlename ?? ''} ` }));



</script>

<template>
    <div>
        <Select
          label="Плательщик"
          :options="[clientOptions]"
          v-model="invoice.client_id"
          :required="true"
          :disabled="true"
        />
        <Input
          label="Сумма"
          :required="true"
          type="number"
          v-model="invoice.sum"
        />

        <Select
          label="Способ оплаты"
          :options="paymentWaysOptions"
          :required="true"
          v-model="invoice.type"
        />

        <Select
          label="Способ оплаты"
          :options="statusOptions"
          :required="true"
          v-model="invoice.status"
        />

        <TextArea
          label="Комментарий"
          :required="true"
          v-model="invoice.comment"
        />
    </div>
</template>
