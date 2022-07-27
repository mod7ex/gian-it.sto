<script setup>
import { ref } from 'vue';

defineProps({
  label: {
    type: String,
    required: false,
  },

  help: {
    type: String,
    required: false,
  },

  comment: {
    type: String,
    required: false,
  },

  modelValue: {
    type: Boolean,
    default: false,
  },
});

const id = Math.random().toString();

defineEmits(['clicked']);

</script>

<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input type="checkbox"
          :id="id"
          class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          :checked="modelValue"
          @change="(e) => $emit('update:modelValue', !modelValue)"
          @click="() => $emit('clicked')"
      />

    </div>

    <div class="ml-3 text-sm" v-if="label || comment">
      <label :for="id" class="font-medium text-gray-700" @click="() => $emit('clicked')">{{ label }}</label>
      <span class="text-gray-500" v-if="comment">{{ comment }}</span>
      <p class="text-gray-500" v-if="help">{{ help }}</p>
    </div>
  </div>
</template>
