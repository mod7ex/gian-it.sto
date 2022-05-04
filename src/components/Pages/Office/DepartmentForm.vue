<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter.js';
import departmentsService from '~/services/departments/departments.js';
import departmentForm from '~/services/departments/departmentForm.js';
import useSuspense from '~/composables/useSuspense.js';
import DepartmentFields from '@/Partials/departments/DepartmentFormFields.vue';

const dialogger = useConfirmDialog();

const SuspensDepartmentFields = useSuspense(DepartmentFields);

const { dropDepartment } = departmentsService();
const { route } = useAppRouter();

const { isEditDepartmentPage, saveDepartment } = departmentForm();

</script>

<template>
  <OfficeLayout title="Создание новой oтделы">
    <template #actions>
      <Button type="secondary" :link="{name: 'Departments'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К отделам
      </Button>

      <Button color="green" @click="saveDepartment">
        <CheckIcon class="w-5 h-5 mr-1" />Сохранить
      </Button>

      <Button
        color="red"
        v-if="isEditDepartmentPage"
        @click="() => dialogger.drop(() => dropDepartment(route.params.id), 'продолжить удаление!', 'Удалить ?')"
      >
        <XIcon class="w-5 h-5 mr-1" />Удалить
      </Button>
    </template>

    <SuspensDepartmentFields loadingMsg="fetching data..." />

    <!-- <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input
          label="Название отдела"
          v-mode="department.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @input="v$.name.$touch"
        />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Город" :options="cities" v-mode="department.city" />
      </div>
    </div> -->
  </OfficeLayout>
</template>

<style scoped>

</style>
