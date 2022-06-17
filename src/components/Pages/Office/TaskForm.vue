<script setup>
import {
  CheckIcon,
  ArrowLeftIcon,
  XIcon,
} from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Form from '@/Partials/tasks/Form.vue';
import useSuspense from '~/composables/useSuspense';

import service from '~/services/tasks/form';

const { isEditPage, saveTask } = service();

const SuspenseArea = useSuspense(Form);

</script>

<template>
  <OfficeLayout :title="isEditPage ? 'Обновление задачи' : 'Создание новой задачи'">
    <template #actions>
      <Button type="secondary" link="/tasks">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
      </Button>

      <Button color="green" @click="saveTask">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <v-can :ability="['delete tasks', 'delete department tasks', 'delete own tasks']" v-if="isEditPage">
        <Button color="red">
          <XIcon class="w-5 h-5 mr-1"/>Удалить
        </Button>
      </v-can>
    </template>

    <suspense-area />

  </OfficeLayout>
</template>
