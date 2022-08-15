<script setup>
import { ref } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number, Object],
  },
  tag: {
    type: String,
    default: 'p',
  },
  tagClass: {
    type: String,
    default: 'p',
  },
});

defineEmits(['update:modelValue']);

const editMode = ref(false);
const inputRef = ref();

const hadelDbClick = () => { editMode.value = true; };
</script>

<template>
  <div :class="$attrs.class">
    <textarea
        :ref="(el) => { inputRef = el }"
        type="text"
        v-if="editMode"
        @blur="editMode = false"
        class="p-2 w-full h-full switch-input"
        @input="e => $emit('update:modelValue', e.target.value)"
    >{{ typeof modelValue === 'string' ? modelValue : '...' }}</textarea>
    <component
      :is="tag"
      :class="['w-full h-full', tagClass]"
      @dblclick="hadelDbClick"
      v-else
    >{{ typeof modelValue === 'string' ? modelValue : '...' }}</component>
  </div>
</template>

<style scoped>
.switch-input{
  border: none !important;
}
.switch-input:focus{
  outline: none !important;
  border: none !important;
}

div * {
  overflow-wrap: break-word;
}

textarea::-webkit-scrollbar {
  display: none;
  resize: none !important;
}

</style>
