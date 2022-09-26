<script setup>
import { computed, watch } from 'vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/finances/form';
import store from '~/store/finances/groups';
import departmentStore from '~/store/departments';
import orderStore from '~/store/orders/orders';

const { options, load } = store;
const { current, options: depOptions } = departmentStore;
const { load: loadOrders, options: orderOptions, state } = orderStore;

const { finance, atMountedFinanceForm, v$, types, payment_types, isThePage } = form();

await Promise.all([ load(), loadOrders({ department_id: current.value }), atMountedFinanceForm() ])

watch(() => finance.order_id, (_id) => {
  const _order = state.raw.find(({ id }) => id == _id);

  finance.sum = _order?.total_sum ?? 0;
});

const filter = ({ value }) => !value.startsWith('buy')

</script>

<template>
    <div>
      <Select
        label="Тип операции"
        v-model="finance.operation_type"
        :options="isThePage ? types.filter(filter) : types"
        :required="true"
        :error="v$.operation_type.$errors[0]?.$message"
        @blured="v$.operation_type.$touch"
      />

      <Select
        label="Заказ-наряд"
        v-model="finance.order_id"
        :options="orderOptions"
        :disabled="isThePage || finance.operation_type === 'buy' || finance.operation_type === 'buyReturn'"
        :required="true"
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
        />

        <Input
          v-if="!isThePage"
          label="Сумма"
          :disabled="!!finance.order_id"
          v-model="finance.sum"
          type="number" :min="0" :step="1"
          :required="true"
          :error="v$.sum.$errors[0]?.$message"
          @blured="v$.sum.$touch"
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
          v-if="!isThePage"
          label="Группа"
          v-model="finance.finance_group_id"
          :options="options"
          :required="true"
          :error="v$.finance_group_id.$errors[0]?.$message"
          @blured="v$.finance_group_id.$touch"
        />
        <v-can ability="crud departments" v-if="!isThePage" >
          <Select
            label="Отделение"
            v-model="finance.department_id"
            :required="true"
            :options="depOptions"
          />
        </v-can>
    </div>
</template>
