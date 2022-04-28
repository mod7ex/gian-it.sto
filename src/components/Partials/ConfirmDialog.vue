<script setup>
import Dialog from '@/UI/Dialog.vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const {
  opened,
  loading,
  title,
  text,
  resultMsg,
  success,
  close,
  proceed } = useConfirmDialog();
</script>

<template>
  <Dialog
    :open="opened"
    @close="close"
    :type="success ? 'success' : 'danger'"
  >
    <template #title>
      {{ resultMsg ?? title }}
    </template>

    <template #text v-if="!resultMsg">
      <div class="my-5 flex justify-center" v-if="loading"><Spinner /></div>
      <span v-else> {{ text }} </span>
    </template>

    <template v-slot:actions v-if="!resultMsg">
      <div class="mt-5 sm:mt-6 flex justify-center items-end">
        <Button @click="close" class="mx-3 justify-center">Закрыть</Button>
        <Button color="red" @click="proceed" class="mx-3 justify-center"> продолжить </Button>
      </div>
    </template>
  </Dialog>
</template>
