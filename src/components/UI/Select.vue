<script setup>
import { computed } from '@vue/runtime-core';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  options: {
    type: Array,
    required: false,
    default: [],
  },
  help: {
    type: String,
    required: false,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  },
});

const styles = [
  'mt-1 block w-full py-2 text-base focus:outline-none sm:text-sm rounded-md shadow-sm',
];

if (props.multiple) {
  styles.push('px-2');
} else {
  styles.push('pl-3 pr-10');
}

if (props.error.length > 0) {
  styles.push('border-red-300 focus:ring-red-500 focus:border-red-500');
} else {
  styles.push('border-gray-300 focus:ring-indigo-500 focus:border-indigo-500');
}
const options = computed(() => props.options.map((e) => {
  if (e instanceof Object) {
    return e;
  }

  return {
    label: e,
    value: e,
  };
}));

</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">
      {{ props.label }}
    </label>

    <select
      :class="styles"
      :multiple="props.multiple"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blured')"
    >
      <option selected disabled>-- выберите --</option>

      <option
        v-for="item in options"
        :value="item.value"
        :key="item.value"
        :selected="modelValue == item.value"
      >
        {{ item.label }}
      </option>
    </select>

    <p class="mt-2 text-sm text-gray-500" v-if="props.help.length > 0">
      {{ props.help }}
    </p>

    <p class="mt-2 text-sm text-red-600" v-if="props.error.length > 0">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped></style>
