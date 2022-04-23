import { ref } from 'vue';

const isOpenDialog = ref(false);

const isDialogWaiting = ref(false);

const dialogTitle = ref('Подтверждать!');
const dialogText = ref('Вы уверены что хотите продолжить ?');

const dialogResultMessage = ref(null);
const isSuccessDialogResult = ref(false);

const dialogProceedFunction = ref(async () => {});

export default function useConfirmDialog() {
  const openConfirmDialog = (onYesFunction, text, title, type = false) => {
    dialogProceedFunction.value = onYesFunction;
    dialogText.value = text;
    dialogTitle.value = title;
    isOpenDialog.value = true;
    isSuccessDialogResult.value = type;
  };

  const showResultConfirmDialog = (resultMessage, success = true) => {
    isDialogWaiting.value = false;
    isSuccessDialogResult.value = success;
    dialogResultMessage.value = resultMessage;
  };

  const closeConfirmDialog = () => {
    isOpenDialog.value = false;
    isDialogWaiting.value = false;

    setTimeout(() => {
      dialogResultMessage.value = null;
      dialogTitle.value = 'Подтверждать!';
      dialogText.value = 'Вы уверены что хотите продолжить ?';
      dialogProceedFunction.value = async () => {};
    }, 300);
  };

  const proceedConfirmDialog = async (...args) => {
    isDialogWaiting.value = true;
    const foo = dialogProceedFunction.value;
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
