<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';

import DepartmentsTable from '~/components/Partials/departments/DepartmentsTable.vue';

const SuspensDepartmentsTable = useSuspense(DepartmentsTable);
</script>

<template>
  <OfficeLayout title="Отделы">
    <template #actions>
      <Button color="blue" link="/departments/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <SuspensDepartmentsTable loadingMsg="получаем oтделы..." />
  </OfficeLayout>
</template>
