<script setup>
import { onMounted, watch } from 'vue';
import Input from '@/UI/Input.vue';
// import Select from '@/UI/Select.vue';
import StoSelect from '@/UI/StoSelect.vue';
import service from '~/services/orders';
import clientStore from '~/store/clients';
import carStore from '~/store/cars/cars';

const { options, load } = clientStore;
const { options: carOptions, load: loadCars } = carStore;

const { filter, current } = service();

watch(current, (department_id) => { load({ department_id }); }, { immediate: true });

onMounted(loadCars);

</script>

<template>
    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end" v-if="filter">

      <Input label="Дата от" type="date" v-model="filter.created_after" />
      <Input label="Дата до" type="date" v-model="filter.created_before" />

      <div class="w-full user">
        <sto-select
          label="Клиент"
          v-model="filter.client_id"
          :options="options"
          class="w-full"
        />
      </div>

      <div class="w-full user">
        <sto-select
          label="Автомобиль"
          v-model="filter.car_id"
          :options="carOptions"
          class="w-full"
        />
      </div>

    </div>
</template>

<style>
.user { max-width: 300px; }
</style>
