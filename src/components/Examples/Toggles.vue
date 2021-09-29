<script setup>
import Toggle from './../UI/Toggle.vue';
import { ref } from 'vue';

const enabled = ref(true)
const log = () => console.log(enabled.value);
</script>

<template>
  <Toggle v-model="enabled" class="mt-4" label="Показывать" />
</template>

<style scoped>

</style>
