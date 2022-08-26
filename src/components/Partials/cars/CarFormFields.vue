<script setup>
import { computed } from 'vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/cars/carForm';
import markStore from '~/store/cars/marks';
import modelStore from '~/store/cars/models';
import engineStore from '~/store/cars/engines';
import fuelStore from '~/store/cars/fuels';
import clientStore from '~/store/clients';

const props = defineProps({
  inModal: {
    type: Boolean,
    default: true,
  },
});

const { options: markOptions, load: loadMarks } = markStore;
const { getMarkModels, load: loadModels } = modelStore;
const { options: engineOptions, load: loadEngines } = engineStore;
const { options: fuelOptions, load: loadFuels } = fuelStore;
const { options: clientOptions, load: loadClients } = clientStore;

const { atMountedCarForm, carFields, theSelectedCarMark, v$, routeInstance } = form(props.inModal);

const extractor = ({ id, name }) => ({ value: id, label: name });
const modelOptions = computed(() => getMarkModels(theSelectedCarMark.value).map(extractor));

await Promise.all([loadMarks(),loadModels(),loadEngines(),loadFuels(),loadClients(),atMountedCarForm(props.inModal)]);

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Select
                :disabled="routeInstance?.query?.client_id"
                label="Владелец"
                :options="clientOptions"
                v-model="carFields.client_id"
                :required="true"
                :error="v$.client_id.$errors[0]?.$message"
                @blured="v$.client_id.$touch"
            />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Input
                label="Вин номер"
                v-model="carFields.vin"
                :required="true"
                :error="v$.vin.$errors[0]?.$message"
                @input="v$.vin.$touch"
                mask="XXXXXXXXXXXXXXXXXXXX"
            />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Input label="Гос номер" v-model="carFields.number" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Input
                label="Год выпуска"
                type="number"
                :min="1950"
                :max="new Date().getFullYear()"
                mask="####"
                :step="2"
                v-model="carFields.year"
                :error="v$.year.$errors[0]?.$message"
                @input="v$.year.$touch"
            />
        </div>
        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Select label="Марка" :options="markOptions" v-model="theSelectedCarMark" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4">
            <Select
                :disabled="!theSelectedCarMark"
                label="Модель"
                :options="modelOptions"
                v-model="carFields.car_model_id"
                :required="true"
                :error="v$.car_model_id.$errors[0]?.$message"
                @blured="v$.car_model_id.$touch"
            />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <Input label="Кузов" v-model="carFields.body" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <Select label="Двигатель" :options="engineOptions" v-model="carFields.engine_volume_id" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <Select label="Топливо" :options="fuelOptions" v-model="carFields.fuel_id" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <Input label="Цвет" v-model="carFields.color" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <TextArea label="Примечание" v-model="carFields.notes" />
        </div>
    </div>
</template>
