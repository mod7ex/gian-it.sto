<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import departmentForm from '~/services/departments/departmentForm.js';

const { v$, cities, department, atMountedDepartmentForm } = departmentForm();

await atMountedDepartmentForm();

defineEmits(['close']);

</script>
<template>
    <Input label="Название отдела" v-model="department.name" :required="true" :error="v$.name.$errors[0]?.$message" @input="v$.name.$touch"/>

    <div class="space-y-1">
        <Select label="Город" :options="cities" v-model="department.city" />
    </div>
</template>
