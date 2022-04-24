<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ConfirmDialog from '~/components/Partials/ConfirmDialog.vue';
import Toast from '~/components/Partials/Toast.vue';
</script>

<template>
  <ConfirmDialog />
  <Toast />
  <router-view></router-view>
</template>

<style>
@import "vue-toastification/dist/index.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
