<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Table from '@/Partials/processes/TasksTable.vue';
import useSuspense from '~/composables/useSuspense';
import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter();

const SuspenseArea = useSuspense(Table);

</script>

<template>
  <OfficeLayout :title="`${ route.params.name ?? 'Процесс' } / Список задач`">
    <template #actions>
        <Button type="secondary" :link="{name: 'Processes'}">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>К списку процессов
        </Button>

        <Button color="blue" :link="{ name: 'DcForm', params: {id: route.params.id} }" >
          <PlusCircleIcon class="w-5 h-5 mr-1" />Добавить Диагностическую карту
        </Button>

        <Button color="blue" :link="{ name: 'ProcessTaskForm', params: {id: route.params.id} }" >
          <PlusCircleIcon class="w-5 h-5 mr-1" />Добавить задачу
        </Button>
    </template>

    <!-- Table -->

    <suspense-area loadingMsg="Получение списка задач..." />
  </OfficeLayout>
</template>
