<script setup>
import { XIcon } from '@heroicons/vue/solid';

const props = defineProps({
  icon: {
    type: Object,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: 'blue', // red, green, blue, yellow
  },
  close: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// for prod parser
const colors = [
  'bg-red-50',
  'text-red-400',
  'text-red-800',
  'text-red-700',
  'bg-red-50',
  'text-red-500',
  'hover:bg-red-100',
  'focus:ring-offset-red-50',
  'focus:ring-red-600',

  'bg-blue-50',
  'text-blue-400',
  'text-blue-800',
  'text-blue-700',
  'bg-blue-50',
  'text-blue-500',
  'hover:bg-blue-100',
  'focus:ring-offset-blue-50',
  'focus:ring-blue-600',

  'bg-green-50',
  'text-green-400',
  'text-green-800',
  'text-green-700',
  'bg-green-50',
  'text-green-500',
  'hover:bg-green-100',
  'focus:ring-offset-green-50',
  'focus:ring-green-600',

  'bg-yellow-50',
  'text-yellow-400',
  'text-yellow-800',
  'text-yellow-700',
  'bg-yellow-50',
  'text-yellow-500',
  'hover:bg-yellow-100',
  'focus:ring-offset-yellow-50',
  'focus:ring-yellow-600',

  'bg-indigo-50',
  'text-indigo-400',
  'text-indigo-800',
  'text-indigo-700',
  'bg-indigo-50',
  'text-indigo-500',
  'hover:bg-indigo-100',
  'focus:ring-offset-indigo-50',
  'focus:ring-indigo-600',

  'bg-gray-50',
  'text-gray-400',
  'text-gray-800',
  'text-gray-700',
  'bg-gray-50',
  'text-gray-500',
  'hover:bg-gray-100',
  'focus:ring-offset-gray-50',
  'focus:ring-gray-600',

  'bg-purple-50',
  'text-purple-400',
  'text-purple-800',
  'text-purple-700',
  'bg-purple-50',
  'text-purple-500',
  'hover:bg-purple-100',
  'focus:ring-offset-purple-50',
  'focus:ring-purple-600',
];
</script>

<template>
  <div :class="['rounded-md p-4', `bg-${props.color}-50`]">
    <div class="flex">
      <div class="flex-shrink-0" v-if="props.icon">
        <component :is="props.icon" :class="['h-5 w-5', `text-${props.color}-400`]" aria-hidden="true" />
      </div>

      <div class="ml-3">
        <slot name="title">
          <h3 :class="['text-sm font-medium', `text-${props.color}-800`]" v-if="props.title">
            {{ props.title }}
          </h3>
        </slot>

        <slot name="text">
          <div :class="['mt-2 text-sm', `text-${props.color}-700`]" v-if="props.text">
              <p>
                {{ props.text }}
              </p>
          </div>
        </slot>
      </div>

      <slot name="close">
        <div class="ml-auto pl-3" v-if="props.close">
          <div class="-mx-1.5 -my-1.5">
            <button type="button"
                    :class="['inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2', `bg-${props.color}-50 text-${props.color}-500 hover:bg-${props.color}-100 focus:ring-offset-${props.color}-50 focus:ring-${props.color}-600`]"
                    @click="$emit('close')"
            >
              <span class="sr-only">Закрыть</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
