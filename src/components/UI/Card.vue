<script setup>
const props = defineProps({
  css_style: {
    type: String,
    required: false,
    default: 'px-4 py-5',
  },
});
</script>

<template>
  <div class="bg-white overflow-hidden sm:rounded-lg shadow">
      <slot name="inner">
          <div class="px-4 py-5 border-b border-gray-200">
              <slot name="header"></slot>
          </div>

          <div :class="props.css_style">
              <slot></slot>
          </div>

          <div class="px-4 py-5 border-t border-gray-200">
              <slot name="footer"></slot>
          </div>
      </slot>
  </div>
</template>
