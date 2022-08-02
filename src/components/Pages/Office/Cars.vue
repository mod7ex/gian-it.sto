<script setup>
import {
  PlusCircleIcon,
  GlobeIcon,
  ArrowsExpandIcon,
  ArrowLeftIcon,
  // UserGroupIcon,
} from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import CarsTable from '~/components/Partials/cars/CarsTable.vue';
import useSuspense from '~/composables/useSuspense.js';

const SuspensCarsTable = useSuspense(CarsTable);

</script>

<template>
  <OfficeLayout title="Автомобили">
    <template #actions>

      <Button type="secondary" :link="{name: 'Clients'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />К клиентам
      </Button>

<!--
      <v-can ability="crud fuels">
        <Button type="secondary" :link="{name: 'CarMarks'}">
          <GlobeIcon class="w-5 h-5 mr-1" />Тип топлива
        </Button>
      </v-can>
-->

      <v-can ability="crud car marks">
        <Button type="secondary" :link="{name: 'CarMarks'}">
          <GlobeIcon class="w-5 h-5 mr-1" />Марки автомобилей
        </Button>
      </v-can>

      <v-can ability="crud car models">
        <Button type="secondary" :link="{name: 'CarModels'}">
          <ArrowsExpandIcon class="w-5 h-5 mr-1" />Модели автомобилей
        </Button>
      </v-can>

      <v-can ability="crud cars">
        <Button color="blue" :link="{name: 'CarForm'}">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </v-can>

    </template>

    <SuspensCarsTable />

  </OfficeLayout>
</template>
