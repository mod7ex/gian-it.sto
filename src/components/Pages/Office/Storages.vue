<script setup>
import { PlusCircleIcon, CogIcon, BellIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/storage/Table.vue';
import form from '~/services/storage/form';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { render } = form();

const SuspenseTable = useSuspense(Table);

</script>

<template>
    <OfficeLayout title="Все склады">
      <template #actions>
        <Button type="secondary" :link="{ name: 'StorageRequests' }">
          <BellIcon class="w-5 h-5 mr-1"/>Запрошенные запчасти
        </Button>

        <Button type="secondary" :link="{ name: 'Producers' }">
          <CogIcon class="w-5 h-5 mr-1"/>Производители
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <suspense-table loadingMsg="получаем складов..." v-if="current" :key="`dep-${current}`" />

    </OfficeLayout>
</template>
