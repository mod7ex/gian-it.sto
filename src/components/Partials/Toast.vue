<script setup>
import Toast from '@/UI/Toast.vue';
import useToast from '~/composables/useToast.js';

const { isOpenToast, toastColor, toastIcon, toastTitle, toastText } = useToast();
</script>

<template>
  <Toast :open="isOpenToast" :color="toastColor" :icon="toastIcon">
    <template #text>{{ toastText }}</template>
    <template #title>{{ toastTitle }}</template>
  </Toast>
</template>
