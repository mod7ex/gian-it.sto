<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/orders/items/Stages.vue';
import service from '~/services/orders/stages';

const { render } = service();

const SuspenseTable = useSuspense(Table);

</script>

<template>
    <OfficeLayout title="Этапы заказа">
      <template #actions>
        <Button type="secondary" :link="{ name: 'Orders' }">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>К заказам
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <suspense-table loadingMsg="получение этапов..." />

    </OfficeLayout>
</template>
