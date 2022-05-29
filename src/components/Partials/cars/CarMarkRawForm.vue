<script setup>
import Input from '@/UI/Input.vue';
import carMarkForm from '~/services/cars/carMarkForm';

const { carMarkName, atMountedCarMarksForm } = carMarkForm();

await atMountedCarMarksForm();

defineEmits(['close']);

</script>

<template>
    <Input label="Название марки автомобиля" v-model="carMarkName" :required="true" />
</template>
