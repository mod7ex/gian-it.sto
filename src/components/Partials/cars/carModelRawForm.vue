<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import carModelForm from '~/services/cars/carModelForm';

const { carModel, atMountedCarModelsForm, carMarkOptions } = carModelForm();

await atMountedCarModelsForm();

defineEmits(['close']);

</script>

<template>
    <div>
        <Select label="Hазвание модели автомобиля" v-model="carModel.car_mark_id" :options="carMarkOptions" :required="true" />
        <Input label="Hазвание модели автомобиля" v-model="carModel.name" :required="true" />
    </div>
</template>
