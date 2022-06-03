<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/departments/form.js';

const { department, atMountedDepartmentForm } = form();

await atMountedDepartmentForm();

</script>
<template>
    <Input label="Название отдела" v-model="department.name" :required="true" />
</template>
