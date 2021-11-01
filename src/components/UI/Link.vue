<script setup>
const props = defineProps({
  href: {
    type: String,
    required: false,
    default: '#',
  },
});
</script>

<template>
  <router-link :to="props.href" class="inline-block font-medium text-blue-600 hover:text-blue-500">
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
