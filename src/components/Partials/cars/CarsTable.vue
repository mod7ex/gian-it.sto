<script setup>
import CarsTable from '~/components/Layout/cars/CarsTable.vue'; 
import store from '~/store/cars/cars';

const { cars, load } = store;

await load();

</script>

<template>
  <cars-table :cars="cars" />
</template>
