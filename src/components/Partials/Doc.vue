<script setup>
import { DocumentIcon } from '@heroicons/vue/solid';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/outline';
import Badge from '@/UI/Badge.vue';

defineProps({
  label: String,
  selected: Boolean,
});

defineEmits(['toggled']);

</script>

<template>
  <div class="mb-3 border-2 border-blue-600 bg-blue-50 hover:bg-blue-300 transition-colors duration-300 ease-out rounded-md p-1 flex items-center justify-start">
    <div class="w-12">
      <DocumentIcon  class="text-blue-700" />
    </div>

    <Badge :point="true" color="blue">{{ label }}</Badge>

    <span class="p-2 flex-grow">
      <component :is="selected ? MinusCircleIcon : PlusCircleIcon" :class="['w-5 h-5 ml-auto cursor-pointer', `text-${selected ? 'red' : 'green'}-700`]" @click="$emit('toggled')" />
    </span>
  </div>
</template>
