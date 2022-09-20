<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/finances/form';
import store from '~/store/finances/groups';
import departmentStore from '~/store/departments';
import orderStore from '~/store/orders/orders';
import { computed } from 'vue';

const { options, load } = store;
const { current, options: depOptions } = departmentStore;
const { load: loadOrders, options: orderOptions } = orderStore;

const { finance, atMountedFinanceForm, v$, types, payment_types } = form();

await Promise.all([ load(), loadOrders({ department_id: current.value }), atMountedFinanceForm() ])

</script>

<template>
    <div>
      <Select
        label="Заказ-наряд"
        v-model="finance.order_id"
        :options="orderOptions"
        :required="true"
        :disabled="finance.name.startsWith('Оплата')"
      />
<!--
  :error="v$.order_id.$errors[0]?.$message"
  @blured="v$.order_id.$touch"
-->
        <Input
          label="Название финансовой сделки"
          v-model="finance.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
          :disabled="finance.name.startsWith('Оплата')"
        />

        <Input
          label="Сумма"
          v-model="finance.sum"
          type="number" :min="0" :step="1"
          :required="true"
          :error="v$.sum.$errors[0]?.$message"
          @blured="v$.sum.$touch"
          :disabled="finance.name.startsWith('Оплата')"
        />

        <Select
          label="Тип операции"
          v-model="finance.operation_type"
          :options="types"
          :required="true"
          :error="v$.operation_type.$errors[0]?.$message"
          @blured="v$.operation_type.$touch"
          :disabled="finance.name.startsWith('Оплата')"
        />

        <Select
          label="Вид оплаты"
          v-model="finance.payment_type"
          :options="payment_types"
          :required="true"
          :error="v$.payment_type.$errors[0]?.$message"
          @blured="v$.payment_type.$touch"
        />

        <Select
          v-if="!finance.name.startsWith('Оплата')"
          label="Группа"
          v-model="finance.finance_group_id"
          :options="options"
          :required="true"
          :error="v$.finance_group_id.$errors[0]?.$message"
          @blured="v$.finance_group_id.$touch"
          :disabled="finance.name.startsWith('Оплата')"
        />
        <v-can ability="crud departments">
          <Select
            label="Отделение"
            v-model="finance.department_id"
            :required="true"
            :options="depOptions"
            :disabled="finance.name.startsWith('Оплата')"
          />
        </v-can>
    </div>
</template>
