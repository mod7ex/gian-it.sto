<script setup>
import Checkbox from '@/UI/Checkbox.vue';
import { ref } from 'vue';

const enabled = ref(true)
const log = () => console.log(enabled.value);
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Чекбоксы</h2>
  <Checkbox v-model="enabled" label="Переключатель" comment="текст" help="Помощь" />
</template>

<style scoped>

</style>
