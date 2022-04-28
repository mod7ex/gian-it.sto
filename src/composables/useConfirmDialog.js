import { ref } from 'vue';

const defaultDialogOptions = {
  opened: false,
  loading: false,
  title: 'Подтверждать!',
  text: 'Вы уверены что хотите продолжить ?',
  resultMsg: null,
  success: false,
  proceedFunction: async () => ({ message: '', success: true }),
};

const opened = ref(defaultDialogOptions.opened);
const loading = ref(defaultDialogOptions.loading);
const title = ref(defaultDialogOptions.title);
const text = ref(defaultDialogOptions.text);
const resultMsg = ref(defaultDialogOptions.resultMsg);
const success = ref(defaultDialogOptions.success);
const proceedFunction = ref(defaultDialogOptions.proceedFunction);

export default function useConfirmDialog() {
  let timer;

  const close = () => {
    opened.value = defaultDialogOptions.opened;
    loading.value = defaultDialogOptions.loading;

    setTimeout(() => {
      title.value = defaultDialogOptions.title;
      text.value = defaultDialogOptions.text;
      resultMsg.value = defaultDialogOptions.resultMsg;
      success.value = defaultDialogOptions.success;
      proceedFunction.value = defaultDialogOptions.proceedFunction;
    }, 300);

    clearTimeout(timer);
  };

  const open = (_onYesFunction, _text, _title, _type = false) => {
    proceedFunction.value = _onYesFunction;

    text.value = _text ?? defaultDialogOptions.text;
    title.value = _title ?? defaultDialogOptions.title;

    success.value = _type;
    opened.value = true;

    timer = setTimeout(close, 15000);
  };

  const proceed = async () => {
    loading.value = true;

    try {
      const action = proceedFunction.value;

      const result = await action();

      success.value = result?.success ?? true;
      resultMsg.value = result?.message ?? 'Success. msg';
    } catch (error) {
      success.value = false;
      resultMsg.value = 'Something went wrong!';

      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    proceedFunction,
    opened,
    loading,
    title,
    text,
    resultMsg,
    success,

    close,
    open,
    proceed,
  };
}
