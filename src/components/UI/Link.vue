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
  <a :href="props.href" class="font-medium text-indigo-600 hover:text-indigo-500">
    <slot></slot>
  </a>
</template>

<style scoped>

</style>
