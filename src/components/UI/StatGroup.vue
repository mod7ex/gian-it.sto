<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <h3 class="text-lg leading-6 font-medium text-gray-900" v-if="props.title">
    {{ props.title }}
  </h3>

  <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <slot></slot>
  </dl>
</template>

<style scoped>

</style>
