<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';

import RolesTable from '~/components/Partials/RolesTable.vue';

const SuspensRolesTable = useSuspense(RolesTable);
</script>

<template>
  <OfficeLayout title="Роли">
    <template #actions>
      <Button type="secondary" link="/employers">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        сотрудникам
      </Button>

      <Button color="blue" link="/roles/create">
        <PlusCircleIcon class="w-5 h-5 mr-1" />
        Создать
      </Button>
    </template>

    <SuspensRolesTable loadingMsg="получаем роли..." />

  </OfficeLayout>
</template>
