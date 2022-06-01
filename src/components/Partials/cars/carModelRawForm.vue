<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/cars/carModelForm';
import markStore from '~/store/cars/marks';

const { options, load } = markStore;

const { carModel, atMountedCarModelsForm } = form();

await (async () => {
  await load();
  await atMountedCarModelsForm();
})();

</script>

<template>
    <div>
        <Select label="марка автомобиля" v-model="carModel.car_mark_id" :options="options" :required="true" />
        <Input label="Hазвание модели автомобиля" v-model="carModel.name" :required="true" />
    </div>
</template>
