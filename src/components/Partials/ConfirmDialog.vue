<script setup>
import Dialog from '@/UI/Dialog.vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const {
  isOpenDialog,
  dialogTitle,
  dialogText,
  isDialogWaiting,
  dialogResultMessage,
  isSuccessDialogResult,

  closeConfirmDialog,
  proceedConfirmDialog,
} = useConfirmDialog();
</script>

<template>
  <Dialog
    :open="isOpenDialog"
    @close="closeConfirmDialog"
    :type="isSuccessDialogResult ? 'success' : 'danger'"
  >
    <template #title>
      {{ dialogResultMessage ? dialogResultMessage : dialogTitle }}
    </template>

    <template #text v-if="!dialogResultMessage">
      <div class="my-5 flex justify-center" v-if="isDialogWaiting">
        <Spinner />
      </div>
      <span v-else>
        {{ dialogText }}
      </span>
    </template>

    <template v-slot:actions v-if="!dialogResultMessage">
      <div class="mt-5 sm:mt-6 flex justify-center items-end">
        <Button @click="closeConfirmDialog" class="mx-3 justify-center">
          Закрыть
        </Button>

        <Button
          color="red"
          @click="proceedConfirmDialog"
          class="mx-3 justify-center"
        >
          продолжить
        </Button>
      </div>
    </template>
  </Dialog>
</template>
