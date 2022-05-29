<script setup>
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';

import carForm from '~/services/cars/carForm';

const {
  atMountedCarForm,
  carFields,
  markOptions,
  modelOptions,
  engineOptions,
  fuelOptions,
  clientOptions,
  theSelectedCarMark,
} = carForm();

await atMountedCarForm();

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4">
            <Select label="Владелец" :options="clientOptions" v-model="carFields.client_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Вин номер" v-model="carFields.vin" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Гос номер" v-model="carFields.number" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Год выпуска" type="number" min="1950" :max="new Date().getFullYear()" step="2" mask="####" v-model="carFields.year" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Марка" :options="markOptions" v-model="theSelectedCarMark" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Модель" :options="modelOptions" v-model="carFields.car_model_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Кузов" v-model="carFields.body" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Двигатель" :options="engineOptions" v-model="carFields.engine_volume_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Топливо" :options="fuelOptions" v-model="carFields.fuel_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Цвет" v-model="carFields.color" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <TextArea label="Примечание" v-model="carFields.notes" />
        </div>
    </div>
</template>
