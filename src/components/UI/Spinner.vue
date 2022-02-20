<template>
  <div>
   <div class="w-8 h-8 border-4 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin"></div>
   <slot></slot>
  </div>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
