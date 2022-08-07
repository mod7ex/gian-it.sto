<script setup>
/* for docs  https://vueup.github.io/vue-quill */
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref, watch } from 'vue';

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

const data = ref('');

watch(() => props.modelValue, (v) => {
  data.value = v;
}, { immediate: true });

</script>

<template>
  <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" v-if="props.label.length > 0">
        {{ props.label }}
      </label>
      <quill-editor
        v-model:content="data"
        contentType="html"
        @textChange="(e) => $emit('update:modelValue', data)"
        theme="snow"
        toolbar="minimal"
        style="height: 200px"
      />
  </div>
</template>

<style>
.ql-snow {
  border-radius: 6px;
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
