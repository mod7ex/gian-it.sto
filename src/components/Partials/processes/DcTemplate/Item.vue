<script setup>

defineProps({
  draggable: {
    type: Boolean,
    default: true,
  },
});

</script>

<template>
  <div :class="['rounded-md shadow-md item-dc border border-gray-400 flex flex-col items-stretch justify-items-stretch', $attrs.class]" >

    <div :class="['rounded-t font-bold bg-gray-300 text-black border-b-2 border-gray-400', draggable ? 'cursor-grab' : '']">
      <h3 class="p-2 text-center text-lg" >
        <slot name="header"></slot>
        </h3>
    </div>

    <div class="rounded-b h-full">
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
