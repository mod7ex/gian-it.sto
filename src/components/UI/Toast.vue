<script setup>
import { XCircleIcon } from '@heroicons/vue/outline';

const props = defineProps({
  icon: {
    type: [Object, Function, null],
    required: false,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  text: {
    type: String,
    required: false,
    default: 'lorem ipsum',
  },
  color: {
    type: String,
    required: false,
    default: 'blue',
  },
});

defineEmits(['close']);

</script>

<template>
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div :class="['rounded-md p-4', `bg-${props.color}-50`]">
          <div class="flex items-start">

            <div class="flex-shrink-0" v-if="props.icon">
              <component :is="props.icon" :class="['h-5 w-5', `text-${props.color}-400`]"/>
            </div>

            <div class="ml-3 w-0 flex-1 flex items-center">

              <slot name="title">
                <h3 :class="['text-sm font-medium', `text-${props.color}-800`]" v-if="props.title">
                  <slot name="title">{{ props.title }}</slot>
                </h3>
              </slot>

              <slot name="text">
                <div :class="['ml-2 text-sm', `text-${props.color}-700`]" v-if="props.text">
                  <p>
                    <slot name="text">{{ props.text }}</slot>
                  </p>
                </div>
              </slot>

            </div>

            <div>
              <span @click="$emit('close')"><XCircleIcon  :class="['h-5 w-5 cursor-pointer', `text-${props.color}-400`]" /></span>
            </div>

          </div>
        </div>
    </div>
</template>
