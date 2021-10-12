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
  <router-link :to="props.href" class="inline-block font-medium text-indigo-600 hover:text-indigo-500">
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
