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

    <router-link
      v-if="props.href"
      :to="props.href"
      class="inline-block font-medium text-blue-600 hover:text-blue-500"
      :class="{ disabled: props.disabled }"
    >
      <slot></slot>
    </router-link>

  <span
    v-else
    :to="props.href"
    class="inline-block font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
    :class="{ disabled: props.disabled }"
  >
    <slot></slot>
  </span>
<!--     :is="props.href ? 'router-link' : 'span'"  -->
</template>

<style>
.disabled {
    pointer-events: none;
}
</style>
