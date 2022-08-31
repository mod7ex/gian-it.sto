<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/storage/form';
import departmentStore from '~/store/departments';

const { options, load: loadDepartments } = departmentStore;

const { storage, atMounted, v$ } = form();

await Promise.all([atMounted()]);

</script>

<template>
    <div>
        <Input
          label="Название"
          v-model="storage.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
          class="mb-3"
        />
        <v-can ability="crud departments">
          <Select
            label="Oтделение"
            v-model="storage.department_id"
            :required="true"
            :options="options"
            :error="v$.department_id.$errors[0]?.$message"
            @blured="v$.department_id.$touch"
          />
        </v-can>
    </div>
</template>
