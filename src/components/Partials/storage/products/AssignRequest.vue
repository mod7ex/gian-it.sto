<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
// import TextArea from '@/UI/TextArea.vue';
import storageRequestsStore from '~/store/orders/storage-requests';
import orderStore from '~/store/orders/orders';
import departmentStore from '~/store/departments';
import service from '~/services/storage/products/assign-product';
import { tasksColorMap } from '~/helpers';

const { products_request } = service();
const { loadStatuses, state } = storageRequestsStore;
const { load, options } = orderStore;
const { current} = departmentStore;


let statusOptions;

await Promise.all([loadStatuses(), load({ department_id: current.value })]).then(() => {
  statusOptions = state.statuses.map((value) => ({ label: tasksColorMap[value].label, value }));
})

</script>

<template>
    <div>
        <!--
          <Select
            label="склад"
            :options="storageOptions"
            :required="true"
            v-model="products_request.storage_id"
            class="m-3 sm:col-span-6 col-span-12"
          />
        -->

          <Select
            label="Заказ наряда"
            :options="options"
            :required="true"
            v-model="products_request.order_id"
            class="m-3 sm:col-span-6 col-span-12"
          />

        <Input
          label="Количество"
          type="number"
          :required="true"
          v-model="products_request.count"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Select
          label="Статус"
          :options="statusOptions"
          :required="true"
          v-model="products_request.status"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <!--
          <TextArea
            label="Комментарий"
            :required="true"
            v-model="products_request.comment"
            class="m-3 sm:col-span-6 col-span-12"
          />
        -->

    </div>
</template>
