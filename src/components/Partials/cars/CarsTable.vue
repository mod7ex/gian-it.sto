<script setup>
import CarsTable from '~/components/Layout/cars/CarsTable.vue'; 
import service from '~/services/cars/cars';

const { fetchCars, cars } = service();

await fetchCars(true);

</script>

<template>
  <cars-table :cars="cars" @bottom-touched="() => fetchCars()" />
</template>
