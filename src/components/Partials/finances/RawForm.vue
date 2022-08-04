<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/finances/form';
import store from '~/store/finances/groups';
import departmentStore from '~/store/departments';
import orderStore from '~/store/orders/orders';

const { options, load } = store;
const { current, options: depOptions } = departmentStore;
const { load: loadOrders, options: orderOptions } = orderStore;

const { finance, atMountedFinanceForm, v$ } = form();

const types = [{ label: 'Приход', value: 'in' }, { label: 'Расход', value: 'out' }];

await Promise.all([load(), loadOrders({ department_id: current.value }), atMountedFinanceForm()]);

</script>

<template>
    <div>
        <Select
          label="Заказ-наряд"
          v-model="finance.order_id"
          :options="orderOptions"
          :required="true"
          :error="v$.order_id.$errors[0]?.$message"
          @blured="v$.order_id.$touch"
        />

        <Input
          label="Hазвание финансовая сделка"
          v-model="finance.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
        />

        <Input
          label="Сумма"
          v-model="finance.sum"
          type="number" :min="0" :step="1"
          :required="true"
          :error="v$.sum.$errors[0]?.$message"
          @blured="v$.sum.$touch"
        />

        <Select
          label="Тип операции"
          v-model="finance.operation_type"
          :options="types"
          :required="true"
          :error="v$.operation_type.$errors[0]?.$message"
          @blured="v$.operation_type.$touch"
        />

        <Select
          label="Группа"
          v-model="finance.finance_group_id"
          :options="options"
          :required="true"
          :error="v$.finance_group_id.$errors[0]?.$message"
          @blured="v$.finance_group_id.$touch"
        />
        <v-can ability="crud departments">
          <Select
            label="Отделение"
            v-model="finance.department_id"
            :required="true"
            :options="depOptions"
          />
        </v-can>
    </div>
</template>
