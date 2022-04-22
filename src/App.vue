<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Toast from "@/UI/Toast.vue";
import Dialog from "@/UI/Dialog.vue";
import Spinner from "@/UI/Spinner.vue";
import Button from "@/UI/Button.vue";
import useToast from "~/composables/useToast.js";
import useConfirmDialog from "~/composables/useConfirmDialog.js";

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

const { isOpenToast, toastColor, toastIcon, toastTitle, toastText } =
  useToast();
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

  <Toast :open="isOpenToast" :color="toastColor" :icon="toastIcon">
    <template #text>{{ toastText }}</template>
    <template #title>{{ toastTitle }}</template>
  </Toast>

  <router-view></router-view>
</template>

<style>
@import "vue-toastification/dist/index.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
