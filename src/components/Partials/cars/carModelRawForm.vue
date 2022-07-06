<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import form from '~/services/cars/carModelForm';
import markStore from '~/store/cars/marks';

const { options, load } = markStore;

const { carModel, atMountedCarModelsForm, v$ } = form();

await (async () => {
  await load();
  await atMountedCarModelsForm();
})();

</script>

<template>
    <div>
        <Input
          label="Hазвание модели автомобиля"
          v-model="carModel.name"
          :required="true"
          :error="v$.name.$errors[0]?.$message"
          @blured="v$.name.$touch"
          class="mb-3"
        />
        <Select
          label="марка автомобиля"
          v-model="carModel.car_mark_id"
          :options="options"
          :required="true"
          :error="v$.car_mark_id.$errors[0]?.$message"
          @blured="v$.car_mark_id.$touch"
        />
    </div>
</template>
