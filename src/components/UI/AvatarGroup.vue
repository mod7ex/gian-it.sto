<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: false,
    default: [],
  },
});
</script>

<template>
  <div class="flex -space-x-1 overflow-auto">
    <slot>
      <img v-for="(image, i) in props.images"
           class="inline-block h-9 w-9 rounded-full ring-2 ring-white"
           :src="image"
           alt=""
           :key="i"
      />
    </slot>
  </div>
</template>

<style scoped>

</style>
