<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import departmentForm from '~/services/departments/departmentForm.js';

const { department, cities, v$, atMountedDepartmentForm } = departmentForm();

await atMountedDepartmentForm();

</script>

<template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input
          label="Название отдела"
          v-model="department.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @input="v$.name.$touch"
        />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Город" :options="cities" v-model="department.city" />
      </div>
    </div> 

</template>
