<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/orders/work';
import store from '~/store/employees';
import departmentStore from '~/store/departments';

const { load, options } = store;
const { current } = departmentStore;

const { atMounted, work } = service();

/*

Вид работы (наименование работы)
Количество
Исполнитель (кто делал сотрудник)
Норма времени ( количество требуемого времени)
Цена
Сумма
Субподряд ( работу делал наш контрагент, где то делали на удаленки, нам нужно выбрать контрагента)
Материалы (материалы используемые при ремонте за которые клиент не платит, а. они просто списываются со склада по закупочной стоимости) выбираем номенклатуру по складу

*/

await Promise.all([atMounted(), load({department_id: current.value})]);

</script>

<template>
    <div>
        <Input
          label="Вид работы"
          :required="true"
          v-model="work.name"
          class="sm:col-span-6 col-span-12"
        />

        <Input
          label="Сумма"
          type="number"
          :required="true"
          v-model="work.sum"
          class="sm:col-span-6 col-span-12"
        />

        <Select
          label="Исполнитель"
          :options="options"
          :required="true"
          class="sm:col-span-6 col-span-12"
        />

        <Input
          label="Время"
          type="number"
          :required="true"
          v-model="work.time"
          class="sm:col-span-6 col-span-12"
        />

        <TextArea
          label="Комментарии"
          :required="true"
          v-model="work.comments"
          class="sm:col-span-6 col-span-12"
        />

    </div>
</template>
