<script setup>
</script>
<template>
  <div>
   <div class="border-4 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin w-8 h-8"></div>
   <slot></slot>
  </div>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
