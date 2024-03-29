<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline';
import { computed, onMounted, shallowRef, watch } from 'vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/cars/carForm';
import markStore from '~/store/cars/marks';
import modelStore from '~/store/cars/models';
import engineStore from '~/store/cars/engines';
import fuelStore from '~/store/cars/fuels';
import clientStore from '~/store/clients';
import departmentStore from '~/store/departments';
import StoSelect from '@/UI/StoSelect.vue'; 
import carModelForm from '~/services/cars/carModelForm';
import carMarkForm from '~/services/cars/carMarkForm';

const props = defineProps({
  inModal: {
    type: Boolean,
    default: true,
  },
});

const { current } = departmentStore;
const { options: markOptions, load: loadMarks } = markStore;
const { getMarkModels, load: loadModels } = modelStore;
const { options: engineOptions, load: loadEngines } = engineStore;
const { options: fuelOptions, load: loadFuels } = fuelStore;
const { options: clientOptions, load: loadClients } = clientStore;

const { atMountedCarForm, carFields, theSelectedCarMark, v$, routeInstance } = form(props.inModal);

const extractor = ({ id, name }) => ({ value: id, label: name });
const modelOptions = computed(() => getMarkModels(theSelectedCarMark.value).map(extractor));

await Promise.all([loadMarks(),loadModels(),loadEngines(),loadFuels(),loadClients({department_id: props.inModal ? current.value : undefined }),atMountedCarForm(props.inModal)]);

const engineVolumeIndex = shallowRef()

watch(engineVolumeIndex, (v) => {
    // const _index = engineOptions.value.length - v - 1
    carFields.engine_volume_id = engineOptions.value[v]?.value
})

onMounted(() => { engineVolumeIndex.value = engineOptions.value.findIndex(({value}) => carFields.engine_volume_id == value) })

const { render: renderModalForm } = carModelForm('#sto-modal-upper' , (v) => {
    carFields.car_model_id = v.car_model?.id
    // console.log(v)
})

const { render: renderMarkFom } = carMarkForm('#sto-modal-upper' , (v) => {
    theSelectedCarMark.value = v.car_mark?.id

    // console.log(v)
})

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

        <div class="col-span-12 sm:col-span-6 md:col-span-4 flex items-center justify-center">
            <sto-select @bottom-touched="() => {}" label="Марка" :options="markOptions" v-model="theSelectedCarMark" class="flex-grow mr-1" />
            <PlusCircleIcon class="w-6 text-gray-600 cursor-pointer hover:text-gray-800" @click="() => renderMarkFom()" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-4 flex items-center justify-center">
            <Select
                label="Модель"
                :disabled="!theSelectedCarMark"
                :options="modelOptions"
                v-model="carFields.car_model_id"
                :required="true"
                :error="v$.car_model_id.$errors[0]?.$message"
                @blured="v$.car_model_id.$touch"
                class="flex-grow mr-1"
            />
            <PlusCircleIcon class="w-6 text-gray-600 cursor-pointer hover:text-gray-800" @click="() => renderModalForm()" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <Input label="Кузов" v-model="carFields.body" />
        </div>

        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <label for="engine-volume" class="block text-sm font-medium text-gray-700 text-left mb-1">Двигатель</label>
            <div class="border border-gray-300 rounded flex items-center" >
                <span class="h-9 w-16 text-center border-r border-gray-300 font-light text-xl rounded py-1 px-3" >{{ engineOptions[engineVolumeIndex]?.label }}</span>
                <span class="px-3 flex-grow flex flex-col items-center" >
                    <input class="w-full" id="engine-volume" type="range" :max="engineOptions.length - 1" v-model="engineVolumeIndex">
                </span>
            </div>
            <!-- <Select label="Двигатель" :options="engineOptions" v-model="carFields.engine_volume_id" /> -->
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

<style>
input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: gray;
    border-radius: 50%;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: gray;
    border-radius: 50%;
}

input[type=range]::-webkit-slider-thumb {
    margin-top: -6px;
    background-color: aqua;
}

input[type=range]::-moz-range-thumb {
    margin-top: -6px;
    background-color: aqua;
}
</style>