<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import CarModelsTable from '~/components/Partials/cars/CarModelsTable.vue';
import carModelForm from '~/services/cars/carModelForm';
import ModalForm from '@/Partials/ModalForm.vue';
import RawForm from '~/components/Partials/cars/carModelRawForm.vue';

const { setModalVisibility, saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = carModelForm();

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

    <modal-form
      :loading="loading"
      :errorMsg="errorMsg"
      :success="success"
      :ready="ready"
      :open="isModalUp"
      @close="() => setModalVisibility(false)"
      @submited="()=>saveForm()"
    >
      <template #title>{{ `${isUpdate ? 'Oбновляете' : 'Создайте'} Модель автомобиля` }}</template>

      <template #form><raw-form /></template>
    </modal-form>

    <SuspensCarModelsTable loadingMsg="получаем модели автомобиля..." />

  </OfficeLayout>
</template>
