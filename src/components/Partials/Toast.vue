<script setup>
import Toast from '@/UI/Toast.vue';

defineProps({
  color: {
    type: String,
    default: 'blue',
  },

  icon: {
    type: [Object, Function, null],
    default: null,
  },

  text: {
    type: String,
    default: 'lorem ipsum',
  },

  title: {
    type: String,
    default: '',
  },

});

</script>

<template>
  <Toast :color="color" :icon="icon">
    <template #text>{{ text }}</template>
    <template #title>{{ title }}</template>
  </Toast>
</template>
