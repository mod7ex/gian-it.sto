<script setup>
import { CheckIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import employerForm from '~/services/employerForm.js';
import EmployerFormFields from '~/components/Partials/EmployerFormFields.vue';

import useSuspense from '~/composables/useSuspense.js';

const SuspensEmployerFormFields = useSuspense(EmployerFormFields);

const { saveUser } = employerForm();
</script>

<template>
  <OfficeLayout title="Создание нового сотрудника">
    <template #actions>
      <Button type="secondary" link="/employers">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        Вернуться
      </Button>

      <Button color="green" @click="saveUser">
        <CheckIcon class="w-5 h-5 mr-1" />
        Сохранить
      </Button>
    </template>

      <SuspensEmployerFormFields />
  </OfficeLayout>
</template>

<style scoped></style>
