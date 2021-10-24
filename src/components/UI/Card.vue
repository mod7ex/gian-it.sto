<script setup>

</script>

<template>
  <div class="bg-white overflow-hidden sm:rounded-lg shadow">
    <div class="px-4 py-5 border-b border-gray-200">
      <slot name="header"></slot>
    </div>

    <div class="px-4 py-5">
      <slot></slot>
    </div>

    <div class="px-4 py-5 border-t border-gray-200">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
