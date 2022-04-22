import { ref, h, watch } from "vue";

let isOpenDialog = ref(false);

let isDialogWaiting = ref(false);

let dialogTitle = ref("Подтверждать!");
let dialogText = ref("Вы уверены что хотите продолжить ?");

let dialogResultMessage = ref(null);
let isSuccessDialogResult = ref(false);

let dialogProceedFunction = ref(async () => {});

export default function useConfirmDialog() {
  let openConfirmDialog = (onYesFunction, text, title, type = false) => {
    dialogProceedFunction.value = onYesFunction;
    dialogText.value = text;
    dialogTitle.value = title;
    isOpenDialog.value = true;
    isSuccessDialogResult.value = type;
  };

  let showResultConfirmDialog = (resultMessage, success = true) => {
    isDialogWaiting.value = false;
    isSuccessDialogResult.value = success;
    dialogResultMessage.value = resultMessage;
  };

  let closeConfirmDialog = () => {
    isOpenDialog.value = false;
    isDialogWaiting.value = false;

    setTimeout(() => {
      dialogResultMessage.value = null;
      dialogTitle.value = "Подтверждать!";
      dialogText.value = "Вы уверены что хотите продолжить ?";
      dialogProceedFunction.value = async () => {};
    }, 300);
  };

  let proceedConfirmDialog = async (...args) => {
    isDialogWaiting.value = true;
    let foo = dialogProceedFunction.value;
    await foo(...args);
  };

  return {
    isOpenDialog,
    dialogTitle,
    dialogText,
    isDialogWaiting,
    dialogProceedFunction,
    dialogResultMessage,
    isSuccessDialogResult,

    closeConfirmDialog,
    openConfirmDialog,
    showResultConfirmDialog,
    proceedConfirmDialog,
  };
}
