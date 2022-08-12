<script setup>
import { XCircleIcon } from '@heroicons/vue/outline';

defineProps({
  draggable: {
    type: Boolean,
    default: true,
  },

  removable: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div :class="['rounded-md shadow-md item-dc border border-gray-400 flex flex-col items-stretch justify-items-stretch', $attrs.class]" >

    <div :class="['rounded-t font-bold bg-gray-300 text-black border-b-2 border-gray-400', draggable ? 'cursor-grab' : '']">
      <h3 class="p-2 text-center text-lg relative" >
        <XCircleIcon
          v-if="removable"
          @click="e => $emit('remove')"
          class="w-8 h-8 p-1 rounded-full cursor-pointer absolute top-1 right-1 hover:text-red-600"
        />
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
  min-width: 250px;
}
.cursor-grab {
  cursor: grabbing;
}
</style>
