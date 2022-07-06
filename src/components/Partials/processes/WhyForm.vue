<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/processes/why-form';

const { why, atMounted, v$ } = form();

await atMounted();

</script>

<template>
    <Input
        label="Название"
        v-model="why.name"
        :required="true"
        :error="v$.name.$errors[0]?.$message"
        @blured="v$.name.$touch"
    />
</template>
