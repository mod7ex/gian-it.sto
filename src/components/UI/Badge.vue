<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: 'gray',
  },
  size: {
    type: String,
    required: false,
    default: 'xs', // xs, sm
  },
  point: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <span :class="[
    'inline-flex items-center py-0.5 rounded-full font-medium',
    `bg-${props.color}-100`, `text-${props.color}-800`,
    `text-${props.size}`, (props.size === 'xs' ? 'px-2.5' : 'px-3')
  ]">
    <svg :class="[
        'mr-1.5 h-2 w-2', `text-${props.color}-400`, (props.size === 'xs' ? '-ml-0.5' : '-ml-1')
    ]" fill="currentColor" viewBox="0 0 8 8" v-if="props.point">
      <circle cx="4" cy="4" r="3" />
    </svg>

    <slot></slot>
  </span>
</template>

<style scoped>

</style>
