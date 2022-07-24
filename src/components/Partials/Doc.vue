<script setup>
import { DocumentIcon } from '@heroicons/vue/solid';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '@heroicons/vue/outline';
import Badge from '@/UI/Badge.vue';

defineProps({
  label: String,
  selected: Boolean,
});

defineEmits(['toggled', 'dropped']);

</script>

<template>
  <div class="mb-3 border-2 border-blue-600 bg-blue-50 hover:bg-blue-300 transition-colors duration-300 ease-out rounded-md p-1 flex items-center justify-start">
    <div class="w-12">
      <DocumentIcon  class="text-blue-700" />
    </div>

    <Badge :point="true" color="blue">{{ label }}</Badge>

    <span class="p-2 flex-grow flex items-center justify-end">
      <TrashIcon @click="$emit('dropped')" class="w-5 h-5 text-red-600 cursor-pointer mr-6" />
      <component :is="selected ? MinusCircleIcon : PlusCircleIcon" :class="['w-5 h-5 cursor-pointer', `text-${selected ? 'red' : 'green'}-700`]" @click="$emit('toggled')" />
    </span>
  </div>
</template>
