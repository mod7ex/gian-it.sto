<script setup>
import { computed } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import { CheckIcon, ExclamationIcon } from '@heroicons/vue/outline';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  icon: {
    type: [Object, Function, null],
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: 'success', // success, danger
  },
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const icon = computed(() => {
  if (!props.icon) return props.type === 'danger' ? ExclamationIcon : CheckIcon;

  return props.icon;
});
</script>

<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto" @close="$emit('close')">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" >&#8203;</span>

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>

              <slot name="icon">
                <div :class="[ 'mx-auto flex items-center justify-center h-12 w-12 rounded-full', props.type === 'danger' ? 'bg-red-100' : 'bg-green-100', ]" >
                  <component :is="icon" :class="[ 'h-6 w-6', props.type === 'danger' ? 'text-red-600' : 'text-green-600', ]" aria-hidden="true" />
                </div>
              </slot>

              <div class="mt-3 text-center sm:mt-5">

                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900" >
                  <slot name="title">
                    {{ props.title }}
                  </slot>
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot name="text">
                      {{ props.text }}
                    </slot>
                  </p>
                </div>

              </div>
            </div>

            <div class="mt-5 sm:mt-6">
              <slot name="actions">
                <button
                  @click="$emit('close')"
                  type="button"
                  :class="[
                    'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:text-sm',
                    `focus:ring-${props.type === 'success' ? 'indigo' : 'red'}-500`,
                    `hover:bg-${props.type === 'success' ? 'indigo' : 'red'}-700`,
                    `bg-${props.type === 'success' ? 'indigo' : 'red'}-600`,
                  ]"
                >
                  Закрыть
                </button>
              </slot>
            </div>

          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
