<script setup>
import { ref } from 'vue';
import { uniqueId } from 'lodash';

const props = defineProps({
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
  }
});

const id = uniqueId('checkbox');
const enabled = ref(props.modelValue);
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input type="checkbox"
             :id="id"
             class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
             v-model="enabled"
             @update:modelValue="() => $emit('update:modelValue', enabled)"
      />
    </div>

    <div class="ml-3 text-sm" v-if="props.label || props.comment">
      <label :for="id" class="font-medium text-gray-700">{{ props.label }}</label>
      <span class="text-gray-500" v-if="props.comment">{{ props.comment }}</span>
      <p class="text-gray-500" v-if="props.help">{{ props.help }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
