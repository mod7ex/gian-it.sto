<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import CarModelsTable from '~/components/Partials/cars/CarModelsTable.vue';
import carModelForm from '~/services/cars/carModelForm';

const { render } = carModelForm();

const SuspensCarModelsTable = useSuspense(CarModelsTable);

</script>

<template>
  <OfficeLayout title="Модели автомобилей">
    <template #actions>
      <Button type="secondary" :link="{name: 'Cars'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К автомобилям
      </Button>

      <Button color="blue" @click="() => render()">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <SuspensCarModelsTable loadingMsg="получаем модели автомобиля..." />

  </OfficeLayout>
</template>
