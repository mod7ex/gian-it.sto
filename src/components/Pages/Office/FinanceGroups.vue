<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import Table from '@/Partials/finances/groups/Table.vue';
import form from '~/services/finances/groups/form';

const { render } = form();

const SuspensFinanceGroupsTable = useSuspense(Table);

</script>

<template>
  <OfficeLayout title="Группы доходов / расходов">
    <template #actions>
      <Button type="secondary" :link="{name: 'Finances'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К финансам
      </Button>

      <Button color="blue" @click="() => render()">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <SuspensFinanceGroupsTable />

  </OfficeLayout>
</template>
