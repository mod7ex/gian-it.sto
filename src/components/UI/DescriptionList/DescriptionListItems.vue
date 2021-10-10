<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'rows', // rows, columns
  }
});

const style = [];
if (props.type === 'columns') {
  style.push('grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2');
} else {
  style.push('sm:divide-y sm:divide-gray-200');
}
</script>

<template>
  <dl :class="style">
    <slot></slot>
  </dl>
</template>

<style scoped>

</style>
