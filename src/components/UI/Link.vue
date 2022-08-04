<script setup>
import useAppRouter from '~/composables/useAppRouter.js';

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

const { route } = useAppRouter();

</script>

<template>
  <router-link :to="!disabled ? props.href : route.fullPath" class="inline-block font-medium text-blue-600 hover:text-blue-500">
    <slot></slot>
  </router-link>
</template>
