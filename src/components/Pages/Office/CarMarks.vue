<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import CarMarksTable from '~/components/Partials/cars/CarMarksTable.vue';
import CarMarkFormModal from '~/components/Partials/cars/CarMarkFormModal.vue';
import carMarkForm from '~/services/cars/carMarkForm';

const { setModalVisibility } = carMarkForm();

const SuspensCarMarksTable = useSuspense(CarMarksTable);

</script>

<template>
  <OfficeLayout title="Марки автомобилей">
    <template #actions>
      <Button type="secondary" :link="{name: 'Cars'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К автомобилям
      </Button>

      <Button color="blue" @click="() => setModalVisibility(true)">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <car-mark-form-modal @close="() => setModalVisibility(false)" />

    <SuspensCarMarksTable loadingMsg="получаем марки автомобиля..." />

  </OfficeLayout>
</template>
