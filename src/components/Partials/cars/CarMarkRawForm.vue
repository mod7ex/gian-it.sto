<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/cars/carMarkForm';

const { mark, atMountedCarMarksForm, v$ } = form();

await atMountedCarMarksForm();

</script>

<template>
    <Input
        label="Название маркa автомобиля"
        v-model="mark.name"
        :required="true"
        :error="v$.name.$errors[0]?.$message"
        @blured="v$.name.$touch"
    />
</template>
