<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  mask: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
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
  meta: {
    type: String,
    required: false,
    default: '',
  },
  view: {
    type: String,
    required: false,
    default: 'default', // default, inset, over
  },
  classMap: {
    type: Array,
    required: false,
    default: [],
  },
  icon: {
    type: Function,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  modelValue: {
    type: [String, Number],
  },
});

const styles = props.classMap.concat([
  'shadow-sm block w-full sm:text-sm rounded-md',
]);

if (props.type === 'color') {
  styles.push('h-9 p-1');
}

if (props.disabled) {
  styles.push('bg-gray-200');
}

if (props.error.length > 0) {
  styles.push(
    'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
  );
} else {
  styles.push('focus:ring-blue-500 focus:border-blue-500 border-gray-300');
}

if (props.icon) {
  styles.push('pl-10');
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-1" v-if="label.length || meta.length" >
      <label class="block text-sm font-medium text-gray-700" v-if="label.length > 0" >
        {{ label }}
      </label>

      <span class="text-sm text-gray-500" v-if="meta.length > 0">
        {{ meta }}
      </span>
    </div>

    <div class="relative rounded-md shadow-sm">
      <slot name="before">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true" v-if="icon" >
          <component :is="icon" class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </slot>

      <input
        :type="type"
        :class="styles"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(event) => $emit('update:modelValue', event.target.value)"
        @blur="(event) => $emit('blured')"
        :disabled="disabled"
        v-maska="mask"
      />

      <slot name="after">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="error.length > 0" >
          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </slot>
    </div>

    <p class="mt-1 text-xs text-red-600" :class="[`text-${error.lenght ? 'red-600' : 'gray-500'}`]">
      &#160;{{ error ?? help  }}
    </p>
  </div>
</template>

<style scoped></style>
