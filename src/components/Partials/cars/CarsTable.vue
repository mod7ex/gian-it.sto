<script setup>
import carsService from '~/services/cars/cars';
import CarsTable from '~/components/Layout/cars/CarsTable.vue';

const { cars, fetchCars } = carsService();

await fetchCars();

</script>

<template>
  <cars-table :cars="cars" />
</template>
