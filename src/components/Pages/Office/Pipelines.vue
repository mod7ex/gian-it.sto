<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/funnels/Table.vue';
import form from '~/services/funnels';

const { render } = form();

const SuspenseTable = useSuspense(Table);

</script>

<template>
    <OfficeLayout title="Все воронки">
      <template #actions>
        <Button type="secondary" :link="{ name: 'Orders' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К заказ нарядам
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <suspense-table loadingMsg="получение воронок..." />

    </OfficeLayout>
</template>
