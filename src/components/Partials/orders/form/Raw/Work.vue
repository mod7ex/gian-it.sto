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
          label="Стоимость"
          type="number"
          :required="true"
          v-model="work.sum"
          class="sm:col-span-6 col-span-12"
        />

        <Select
          label="Исполнитель"
          :options="options"
          :required="true"
          v-model="work.user_id"
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
