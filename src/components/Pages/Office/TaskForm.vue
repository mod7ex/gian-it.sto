<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Form from '@/Partials/tasks/Form.vue';
import useSuspense from '~/composables/useSuspense';
import service from '~/services/tasks/form';
import departmentStore from '~/store/departments';
import taskService from '~/services/tasks';
import { canTasks } from '~/lib/permissions';

const { current } = departmentStore;

const { isEditPage, saveTask, route, back, fields } = service();

const { removeTask } = taskService();

const SuspenseArea = useSuspense(Form);

</script>

<template>
  <OfficeLayout :title="isEditPage ? 'Обновление задачи' : 'Создание новой задачи'">
    <template #actions>
      <Button type="secondary" @click="back">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>Bернуться
      </Button>

      <Button color="green" @click="saveTask">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <Button color="red" @click="() => removeTask(route.params.id, true)" v-if="isEditPage && canTasks(fields, 'delete')">
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-area :key="`task-${current}`" v-if="current" />

  </OfficeLayout>
</template>
