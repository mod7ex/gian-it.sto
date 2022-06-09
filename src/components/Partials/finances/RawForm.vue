<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/finances/form';
import store from '~/store/finances/groups';
import departmentStore from '~/store/departments';

const { options, load } = store;
const { options: departmentOptions } = departmentStore;

const { finance, atMountedFinanceForm } = form();

const types = [
  { label: 'Приход', value: 'in' },
  { label: 'Расход', value: 'out' },
];

await (async () => {
  await load();
  await atMountedFinanceForm();
})();

</script>

<template>
    <div>
        <Input label="Hазвание финансовая сделка" v-model="finance.name" :required="true" />
        <Input label="Сумма" v-model="finance.sum" :required="true" type="number" :min="0" :step="1" />
        <Select label="Тип операции" v-model="finance.operation_type" :required="true" :options="types" />
        <Select label="Группа" v-model="finance.finance_group_id" :required="true" :options="options" />
        <v-can ability="crud departments">
          <Select label="Отделение" v-model="finance.department_id" :required="true" :options="departmentOptions" />
        </v-can>
    </div>
</template>
