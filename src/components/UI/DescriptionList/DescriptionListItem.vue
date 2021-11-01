<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: 'rows', // rows, columns
  },
  columns: {
    type: String,
    required: false,
    default: '1', // 1, 2
  }
});

const style = [];
if (props.type === 'columns') {
  style.push('sm:col-span-' + props.columns);
} else {
  style.push('py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6');
}
</script>

<template>
  <div :class="style">
    <slot name="label">
      <dt class="text-sm font-medium text-gray-500" v-if="props.label">
        {{ props.label }}
      </dt>
    </slot>

    <slot name="value">
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" v-if="props.value">
        {{ props.value }}
      </dd>
    </slot>

    <slot name="text">
      <span class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-3" v-if="props.text">
        {{ props.text }}
      </span>
    </slot>
  </div>
</template>

<style scoped>

</style>
