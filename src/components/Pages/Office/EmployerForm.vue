<script setup>
import { CheckIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import form from '~/services/employers/form';
import EmployerFormFields from '~/components/Partials/employers/EmployerFormFields.vue';

import useSuspense from '~/composables/useSuspense.js';

const SuspensEmployerFormFields = useSuspense(EmployerFormFields);

const { saveUser, isEditEmployerPage, previousPage } = form();
</script>

<template>
  <OfficeLayout :title="isEditEmployerPage ? 'Обновить сотрудника' : 'Создание нового сотрудника'">
    <template #actions>
      <Button type="secondary" @click="()=>previousPage()">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />Вернуться
      </Button>

      <Button color="green" @click="saveUser">
        <CheckIcon class="w-5 h-5 mr-1" />Сохранить
      </Button>
    </template>

    <SuspensEmployerFormFields />
  </OfficeLayout>
</template>
