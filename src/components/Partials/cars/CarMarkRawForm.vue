<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/cars/carMarkForm';

const { mark, atMountedCarMarksForm } = form();

await atMountedCarMarksForm();

</script>

<template>
    <Input label="Название маркa автомобиля" v-model="mark.name" :required="true" />
</template>
