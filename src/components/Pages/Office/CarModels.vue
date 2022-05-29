<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import CarModelsTable from '~/components/Partials/cars/CarModelsTable.vue';
import carModelForm from '~/services/cars/carModelForm';
import carModelFormModal from '~/components/Partials/cars/carModelFormModal.vue';

const { setModalVisibility } = carModelForm();
const SuspensCarModelsTable = useSuspense(CarModelsTable);

</script>

<template>
  <OfficeLayout title="Модели автомобилей">
    <template #actions>
      <Button type="secondary" :link="{name: 'Cars'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К автомобилям
      </Button>

      <Button color="blue" @click="() => setModalVisibility(true)">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <car-model-form-modal @close="() => setModalVisibility(false)" />

    <SuspensCarModelsTable loadingMsg="получаем модели автомобиля..." />

  </OfficeLayout>
</template>
