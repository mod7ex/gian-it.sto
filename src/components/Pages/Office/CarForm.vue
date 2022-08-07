<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import CarFormFields from '~/components/Partials/cars/CarFormFields.vue';
import useSuspense from '~/composables/useSuspense.js';
import form from '~/services/cars/carForm';
import cars from '~/services/cars/cars';
import useAppRouter from '~/composables/useAppRouter.js';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { route, back } = useAppRouter();

const SuspenseArea = useSuspense();

const { saveCar, isEditCarPage } = form(false);

const { dropCar } = cars();

const { drop } = useConfirmDialog();

</script>

<template>
  <OfficeLayout title="Создание нового автомобиля">
    <template #actions>
      <Button type="secondary" @click="()=>back()">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />Вернуться
      </Button>

      <Button color="green" @click="()=>saveCar()">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <Button
        color="red"
        v-if="isEditCarPage"
        @click="() => drop(() => dropCar(route.params.id), 'продолжить удаление!', 'Удалить ?')"
      >
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-area>
      <car-form-fields :in-modal="false" />
    </suspense-area>

  </OfficeLayout>
</template>
