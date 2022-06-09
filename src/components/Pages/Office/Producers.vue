<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/storage/producers/Table.vue';
import form from '~/services/storage/producers/form';

const { render } = form();

const SuspenseTable = useSuspense(Table);

</script>

<template>
  <OfficeLayout title="Производители">
    <template #actions>
      <Button type="secondary" :link="{ name :'Storages' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К складам
      </Button>

      <Button color="blue" @click="() => render()">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <suspense-table loadingMsg="Получаем производители..." />

  </OfficeLayout>
</template>
