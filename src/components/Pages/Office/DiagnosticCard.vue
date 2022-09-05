<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import Table from '@/Partials/processes/QuestionsTable.vue';

const SuspenseArea = useSuspense(Table);

</script>

<template>
  <OfficeLayout title="Шаблоны диагностических карт">
    <template #actions>
      <Button type="secondary" :link="{name: 'Why'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К причинам обращения
      </Button>

      <Button color="blue" :link="{ name: 'DiagnosticCardForm' }">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <!-- Table -->

    <suspense-area loadingMsg="Получение шаблоны..." />

  </OfficeLayout>
</template>
