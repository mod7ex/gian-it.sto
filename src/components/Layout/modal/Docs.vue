<script setup>
import Button from '@/UI/Button.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['outclick', 'close']);

</script>

<template>
  <Transition name="docs-modal">
      <div
        v-if="props.open"
        class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50"
        @click.self="$emit('outclick')"
      >

        <div class="bg-white rounded-md p-7 shadow-2xl max-w-md w-full">
          <slot></slot>

          <Button
            size="xl"
            color="gray"
            @click="$emit('close')"
            class="mt-3 w-full flex justify-center"
          >Закрыть</Button>

        </div>

      </div>
  </Transition>
</template>

<style scoped>
.docs-modal-enter-active,
.docs-modal-leave-active {
  transition: opacity 0.3s ease;
}

.docs-modal-enter-from,
.docs-modal-leave-to {
  opacity: 0;
}
</style>
