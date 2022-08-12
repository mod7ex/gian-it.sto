<script setup>

</script>

<template>
  <div class="rounded-md shadow-md item-dc border border-gray-400">
    <div class="p-2 rounded-t font-bold bg-gray-300 text-black border-b-2 border-gray-400 cursor-grab">
      <slot name="header">the header goes here</slot>
    </div>
    <div class="rounded-b p-2 bg-gray-100">
      <slot name="body">the body goes here</slot>
    </div>
  </div>
</template>

<style scoped>
.item-dc {
  max-width: 300px;
}
.cursor-grab {
  cursor: grabbing;
}
</style>
