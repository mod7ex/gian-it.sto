<script setup>
import { PlusCircleIcon, MapIcon } from '@heroicons/vue/outline';
import useSuspense from '~/composables/useSuspense.js';
import Table from '@/Partials/processes/WhyTable.vue';
import service from '~/services/processes/why-form';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';

const { render } = service();

const SuspenseArea = useSuspense(Table);

</script>

<template>
  <OfficeLayout title="Причины обращения">
    <template #actions>
      <Button type="secondary" :link="{ name: 'DiagnosticCard' }">
        <MapIcon class="w-5 h-5 mr-1"/>Шаблоны диагностических карт
      </Button>

      <Button color="blue" @click="() => render()">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <!-- Table -->

    <suspense-area loadingMsg="Получение причин обращения..." />

  </OfficeLayout>
</template>
