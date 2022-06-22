<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/processes/why-form';

const { why, atMounted } = form();

await atMounted();

</script>

<template>
    <Input label="Название" v-model="why.name" :required="true" />
</template>
