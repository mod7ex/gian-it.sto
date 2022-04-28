<script setup>
import ConfirmDialog from '~/components/Partials/ConfirmDialog.vue';
import Toast from '~/components/Partials/Toast.vue';

</script>

<template>
  <ConfirmDialog />
  <Toast />
  <router-view />
</template>

<style>
@import "vue-toastification/dist/index.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
