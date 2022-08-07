<script setup>
const props = defineProps({
  href: {
    type: [String, Object],
    required: false,
    default: '',
  },

  disabled: {
    type: [String, Boolean, Number],
    default: false,
  },
});
</script>

<template>

  <component
    :is="props.href ? 'router-link' : 'span'"
    :to="props.href"
    class="inline-block font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
    :class="{ disabled: props.disabled }"
  >
    <slot></slot>
  </component>

<!--
    <router-link
      :to="props.href"
      class="inline-block font-medium text-blue-600 hover:text-blue-500"
      :class="{ disabled: props.disabled }"
    >
      <slot></slot>
    </router-link>
-->
</template>

<style>
.disabled {
    pointer-events: none;
}
</style>
