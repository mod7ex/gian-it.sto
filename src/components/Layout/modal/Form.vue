<script setup>
import Button from '@/UI/Button.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'saved']);

</script>

<template>
  <Transition name="form-modal">
      <div
        v-if="props.open"
        class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50 overflow-y-scroll"
      >

        <div class="bg-white rounded-md p-3 pb-9 m-3 mt-48 sm:mt-3 shadow-2xl">
          <slot name="title"></slot>

          <div class="p-3">
            <slot></slot>
          </div>

          <div class="actions flex justify-center">
            <Button
              size="md"
              color="gray"
              @click="$emit('close')"
              class="flex justify-center w-full mx-3 ml-6"
            >Закрыть</Button>

            <Button
              size="md"
              color="blue"
              @click="$emit('saved')"
              class="flex justify-center w-full mx-3 mr-6"
            >Сохранять</Button>
          </div>

        </div>

      </div>
  </Transition>
</template>

<style scoped>
.form-modal-enter-active,
.form-modal-leave-active {
  transition: opacity 0.3s ease;
}

.form-modal-enter-from,
.form-modal-leave-to {
  opacity: 0;
}

</style>
