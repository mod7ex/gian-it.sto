<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: 'rows', // rows, columns
  },
  bordered: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const style = ['px-4'];

if (props.bordered) {
  style.push('border-t border-gray-200 py-5');
}

if (props.type === 'columns') {
  style.push('sm:px-6');
} else {
  style.push('sm:p-0');
}
</script>

<template>
  <div :class="['bg-white overflow-hidden sm:rounded-lg', {'shadow': props.bordered}]">
    <slot name="header">

      <header class="flex items-center justify-between px-4 py-5 sm:px-6">
        <div v-if="props.title || props.subtitle">
          <slot name="title">
            <h3 class="text-lg leading-6 font-medium text-gray-900" v-if="props.title">
              {{ props.title }}
            </h3>
          </slot>

          <slot name="subtitle">
            <p class="mt-1 max-w-2xl text-sm text-gray-500" v-if="props.subtitle">
              {{ props.subtitle }}
            </p>
          </slot>
        </div>

        <slot name="right-title"></slot>
      </header>

    </slot>

    <div :class="style">
      <slot></slot>
    </div>

  </div>
</template>

<style scoped>

</style>
