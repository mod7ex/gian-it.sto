<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Form from '@/Partials/processes/TaskForm.vue';
import service from '~/services/processes/task-form';
import useAppRouter from '~/composables/useAppRouter';

const { isEditPage, saveTask } = service();

const { back } = useAppRouter();

const SuspenseArea = useSuspense(Form);

</script>

<template>
  <!-- <OfficeLayout title="Создание новой задачи для процесса"> -->
  <OfficeLayout :title="isEditPage ? 'Обновление задачи' : 'Создание новой задачи'">
    <template #actions>
      <Button type="secondary" @click="back">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам процесса
      </Button>

      <Button color="green" @click="saveTask">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <Button color="red" v-if="isEditPage">
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-area />

  </OfficeLayout>
</template>
