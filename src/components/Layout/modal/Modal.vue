<script setup>
// import {
//   Dialog,
//   DialogOverlay,
//   DialogTitle,
//   TransitionChild,
//   TransitionRoot,
// } from '@headlessui/vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },

  message: {
    type: String,
    required: false,
  },

  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['outclick']);

</script>

<template>
  <Transition name="modal">
      <div
        v-if="props.open"
        class="absolute p-9 bg-gray-800 inset-0 flex justify-center items-center bg-opacity-75 z-50"
        @click.self="$emit('outclick')"
      >

      <div class="bg-white rounded-md p-7 shadow-2xl">
        <slot name="icon"></slot>

        <div class="text-center">

          <h3 class="text-lg leading-6 font-medium text-gray-700 mb-2" >
            <slot name="title"> {{ props.title }} </slot>

            <p class="text-red-600 text-sm font-normal mt-2"><slot name="message"> {{ props.message ?? '&#160;' }} </slot></p>
          </h3>

          <slot></slot>

        </div>

        <slot name="actions"></slot>
      </div>

      </div>
  </Transition>

<!--
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close.prevent="$emit('outclick')" >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" >&#8203;</span>

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">

              <slot name="icon"></slot>

              <div class="mt-3 text-center sm:mt-5">

                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900" >
                  <slot name="title"> {{ props.title }} </slot>
                </DialogTitle>

                <slot></slot>

              </div>

              <div class="mt-5 sm:mt-6">
                <slot name="actions"></slot>
              </div>

          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
-->
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
