<script setup>
import Input from '@/UI/Input.vue';
import departmentForm from '~/services/departments/departmentForm.js';

const { departmentName, atMountedDepartmentForm } = departmentForm();

await atMountedDepartmentForm();

defineEmits(['close']);

</script>
<template>
    <Input label="Название отдела" v-model="departmentName" :required="true" />
</template>
