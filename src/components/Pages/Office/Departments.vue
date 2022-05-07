<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import DepartmentsTable from '~/components/Partials/departments/DepartmentsTable.vue';
import DepartmentFormModal from '~/components/Partials/departments/FormModal.vue';

import departmentForm from '~/services/departments/departmentForm.js';

const { setModalVisibility } = departmentForm();

const SuspensDepartmentsTable = useSuspense(DepartmentsTable);
</script>

<template>
  <OfficeLayout title="Отделы">
    <template #actions>
      <Button color="blue" @click="() => setModalVisibility(true)">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <department-form-modal @close="() => setModalVisibility(false)" />

    <SuspensDepartmentsTable loadingMsg="получаем oтделы..." />
  </OfficeLayout>
</template>
