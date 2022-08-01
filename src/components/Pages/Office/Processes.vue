<script setup>
import { PlusCircleIcon, QuestionMarkCircleIcon, MapIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Table from '@/Partials/processes/Table.vue';
import useSuspense from '~/composables/useSuspense';
import service from '~/services/processes/form';

const { render } = service();

const SuspenseArea = useSuspense(Table);

</script>

<template>
    <OfficeLayout title="Рабочие процессы">
      <template #actions>
        <!--
          <Button type="secondary" :link="{ name: 'DiagnosticCard' }">
            <MapIcon class="w-5 h-5 mr-1"/>Диагностическая карта
          </Button>
        -->

        <Button type="secondary" :link="{ name: 'Why' }">
          <QuestionMarkCircleIcon class="w-5 h-5 mr-1"/>Причины обращения
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <!-- Table -->

      <suspense-area loadingMsg="Получение рабочих процессов..." />

    </OfficeLayout>
</template>
