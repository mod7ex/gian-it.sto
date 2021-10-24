<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: String,
  },
});
</script>

<template>
  <label class="block text-sm font-medium text-gray-700 mb-1" v-if="props.label.length > 0">
    {{ props.label }}
  </label>
  <QuillEditor theme="snow" toolbar="minimal" style="height: 200px" />
</template>

<style>
.ql-snow {
  border-radius: 6px;
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
