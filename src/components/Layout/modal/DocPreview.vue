<script setup>
import Button from '@/UI/Button.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close']);

</script>

<template>
  <Transition name="docs-modal">
      <div
        v-if="props.open"
        class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50"
      >

        <div class="bg-white rounded-md p-3 shadow-2xl">
          <div class="p-11 doc-conatiner">
            <slot></slot>
          </div>

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

.doc-conatiner {
  max-height: 90vh;
  overflow: scroll;
}

</style>
