<script setup>
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

      <div class="bg-white rounded-md p-7 shadow-2xl max-w-sm w-full">
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
