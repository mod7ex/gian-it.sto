<script setup>
import ConfirmDialog from '~/components/Partials/ConfirmDialog.vue';
</script>

<template>
  <ConfirmDialog />
  <router-view />
</template>

<style>
@import "vue-toastification/dist/index.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
