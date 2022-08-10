<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'rows', // rows, columns
  },

  cols: {
    type: Number,
    default: 2,
  },
});

const style = [];

if (props.type === 'columns') {
  style.push('grid grid-cols-1 gap-x-4 gap-y-8', `sm:grid-cols-${props.cols}`);
} else {
  style.push('sm:divide-y sm:divide-gray-200');
}
</script>

<template>
  <dl :class="$attrs.class ?? style">
    <slot></slot>
  </dl>
</template>
