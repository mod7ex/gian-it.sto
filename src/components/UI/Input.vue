<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
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
  classMap: {
    type: Array,
    required: false,
    default: [],
  },
  modelValue: {
    type: String,
  }
});

const styles = props.classMap.concat(['shadow-sm block w-full sm:text-sm rounded-md']);

if (props.error.length > 0) {
  styles.push('pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500')
} else {
  styles.push('focus:ring-indigo-500 focus:border-indigo-500 border-gray-300')
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <label class="block text-sm font-medium text-gray-700" v-if="props.label.length > 0">
        {{ props.label }}
      </label>

      <span class="text-sm text-gray-500" v-if="props.meta.length > 0">
        {{ props.meta }}
      </span>
    </div>

    <div class="mt-1 relative rounded-md shadow-sm">
      <slot name="before"></slot>
      <input :type="props.type"
             :class="styles"
             :placeholder="props.placeholder"
             :value="props.modelValue"
             @input="event => $emit('update:modelValue', event.target.value)"
      />

      <slot name="after">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
             v-if="props.error.length > 0"
        >
          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      </slot>
    </div>

    <p class="mt-2 text-sm text-gray-500" v-if="props.help.length > 0">
      {{ props.help }}
    </p>

    <p class="mt-2 text-sm text-red-600" id="email-error" v-if="props.error.length > 0">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>

</style>
