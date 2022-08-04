<script setup>
import CarsTable from '~/components/Layout/cars/CarsTable.vue'; 
import store from '~/store/cars/cars';

const { cars, fill, reset } = store;

const fetchCars = async (bool = false) => {
  if (bool) reset();
  await fill();
};

await fetchCars(true);

</script>

<template>
  <cars-table :cars="cars" @bottom-touched="() => fetchCars()" />
</template>
