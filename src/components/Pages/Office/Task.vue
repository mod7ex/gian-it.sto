<script setup>
import { CheckIcon, ClockIcon, PencilIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Preview from '@/Partials/tasks/Preview.vue';

const SuspenseArea = useSuspense(Preview);

</script>

<template>
  <OfficeLayout title="Название задачи">
    <template #actions>
        <Button type="secondary" :link="{name: 'Tasks'}">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
        </Button>

        <Button color="purple">
          <ClockIcon class="w-5 h-5 mr-1"/>Начать
        </Button>

        <Button color="green">
          <CheckIcon class="w-5 h-5 mr-1"/>Завершить
        </Button>

        <Button color="blue">
          <PencilIcon class="w-5 h-5 mr-1"/>Изменить
        </Button>
    </template>

    <suspense-area />

  </OfficeLayout>
</template>
