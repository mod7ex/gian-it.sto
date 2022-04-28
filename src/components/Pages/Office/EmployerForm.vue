<script setup>
import { CheckIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Spinner from '@/UI/Spinner.vue';
import employerForm from '~/services/employerForm.js';
import EmployerFormFields from '~/components/Partials/EmployerFormFields.vue';

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

    <Suspense>
      <EmployerFormFields />

      <template #fallback>
        <div class="col-span-12 sm:col-span-12 flex justify-center">
          <Spinner h="4" w="4">
            <span class="text-sm text-gray-600">Получение данных...</span>
          </Spinner>
        </div>
      </template>
    </Suspense>
  </OfficeLayout>
</template>

<style scoped></style>
