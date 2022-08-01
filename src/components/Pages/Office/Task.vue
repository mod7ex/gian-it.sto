<script setup>
import { CheckIcon, ClockIcon, PencilIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import { onScopeDispose } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Preview from '@/Partials/tasks/Preview.vue';
import service from '~/services/tasks/preview';

const { back, task_id, ping, key, clearMemo, task } = service();

const SuspenseArea = useSuspense(Preview);

onScopeDispose(clearMemo);

</script>

<template>
  <OfficeLayout title="Название задачи">
    <template #actions>
        <Button type="secondary" @click="() => back()">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам
        </Button>

        <Button color="purple" @click="() => ping(true)" blur v-if="((task?.status === 'wait') || (task?.status === 'done')) || (task?.status === 'pause')">
          <ClockIcon class="w-5 h-5 mr-1"/>Начать
        </Button>

        <Button color="green" @click="() => ping(false)" blur v-if="(task?.status === 'process') || (task?.status === 'pause')">
          <CheckIcon class="w-5 h-5 mr-1"/>Завершить
        </Button>

        <Button color="blue" :link="{name: 'TaskEdit', params: {id: task_id} }">
          <PencilIcon class="w-5 h-5 mr-1"/>Изменить
        </Button>
    </template>

    <suspense-area :key="key" />

  </OfficeLayout>
</template>
