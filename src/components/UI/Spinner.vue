<script setup>
const props = defineProps({
  h: {
    type: String,
    required: false,
    default: '8',
  },
  w: {
    type: String,
    required: false,
    default: '8',
  },
});
</script>
<template>
  <div class="flex items-center">
    <div
      :class="[
        'mx-3 border-4 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin',
        `h-${props.h} w-${props.w}`,
      ]"
    ></div>
    <slot></slot>
  </div>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
