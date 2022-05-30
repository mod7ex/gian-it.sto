<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import CarMarksTable from '~/components/Partials/cars/CarMarksTable.vue';
import carMarkForm from '~/services/cars/carMarkForm';
import RawForm from '~/components/Partials/cars/CarMarkRawForm.vue';
import ModalForm from '@/Partials/ModalForm.vue';

const { setModalVisibility, saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = carMarkForm();

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

    <modal-form
      :loading="loading"
      :errorMsg="errorMsg"
      :success="success"
      :ready="ready"
      :open="isModalUp"
      @close="() => setModalVisibility(false)"
      @submited="()=>saveForm()"
    >
      <template #title>{{ `${isUpdate ? 'Oбновляете' : 'Создайте'} марка автомобиля` }}</template>

      <template #form><raw-form /></template>
    </modal-form>

    <SuspensCarMarksTable loadingMsg="получаем марки автомобиля..." />

  </OfficeLayout>
</template>
