<script setup>
import Select from './../UI/Select.vue';
</script>

<template>
  <div class="w-full max-w-xs">
    <Select :options="[
        {label: 'Россия', value: 'RUS'},
        {label: 'Канада', value: 'CAN'},
        {label: 'Италия', value: 'ITA'},
    ]" label="Страна" class="mt-4" />

    <Select :options="[
        {label: 'Россия', value: 'RUS'},
        {label: 'Канада', value: 'CAN'},
        {label: 'Италия', value: 'ITA'},
    ]" label="Страна" class="mt-4" multiple="true" />
  </div>
</template>

<style scoped>

</style>
