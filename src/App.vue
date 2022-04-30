<script setup>
import Loader from '~/components/Partials/Loader.vue';
import { loading } from '~/composables/useAppLoader.js';

</script>

<template>
  <Loader v-if="loading"/>
  <router-view />
</template>

<style>
@import "vue-toastification/dist/index.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
