<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import DepartmentsTable from '~/components/Partials/departments/DepartmentsTable.vue';
import form from '~/services/departments/form.js';
import ModalForm from '@/Partials/ModalForm.vue';
import RawForm from '~/components/Partials/departments/Form.vue';

const { setModalVisibility, saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = form();

const SuspensDepartmentsTable = useSuspense(DepartmentsTable);

</script>

<template>
  <OfficeLayout title="Отделы">
    <template #actions>
      <Button color="blue" @click="() => setModalVisibility(true)">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <modal-form
      :loading="loading"
      :errorMsg="errorMsg"
      :success="success"
      :ready="ready"
      :open="isModalUp"
      @close="() => setModalVisibility(false)"
      @submited="()=>saveForm()"
    >
      <template #title>{{ `${isUpdate ? 'Oбновляете' : 'Создайте'} отдела` }}</template>

      <template #form><raw-form /></template>
    </modal-form>

    <SuspensDepartmentsTable loadingMsg="получаем oтделы..." />
  </OfficeLayout>
</template>
