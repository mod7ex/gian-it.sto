import { ref, defineComponent, h, createApp } from 'vue';
import { TrashIcon } from '@heroicons/vue/outline';
import Dialog from '@/UI/Dialog.vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';

const defaultDialogOptions = {
  loading: false,
  title: 'Подтверждать!',
  text: 'Вы уверены что хотите продолжить ?',
  resultMsg: null,
  success: true,
  icon: null,
  proceedFunction: async () => ({ message: 'it worked!', success: true }),
};

const loading = ref(defaultDialogOptions.loading);
const title = ref(defaultDialogOptions.title);
const text = ref(defaultDialogOptions.text);
const resultMsg = ref(defaultDialogOptions.resultMsg);
const success = ref(defaultDialogOptions.success);
const icon = ref(defaultDialogOptions.icon);
const proceedFunction = ref(defaultDialogOptions.proceedFunction);

let timer;
let ConfirmDialogApp;

const close = () => {
  clearTimeout(timer);

  if (!ConfirmDialogApp) return;
  ConfirmDialogApp.unmount();
  ConfirmDialogApp = undefined;

  loading.value = defaultDialogOptions.loading;
  title.value = defaultDialogOptions.title;
  text.value = defaultDialogOptions.text;
  resultMsg.value = defaultDialogOptions.resultMsg;
  success.value = defaultDialogOptions.success;
  proceedFunction.value = defaultDialogOptions.proceedFunction;
};

const proceed = async () => {
  loading.value = true;

  try {
    const action = proceedFunction.value;

    const result = await action();

    success.value = result?.success ?? false;
    resultMsg.value = result?.message ?? 'Something went wrong!';
  } catch (error) {
    success.value = false;
    resultMsg.value = 'Something went wrong!';

    console.log(error);
  } finally {
    loading.value = defaultDialogOptions.loading;
    icon.value = defaultDialogOptions.icon;
  }
};

const spinner = h('div', { class: 'my-5 flex justify-center' }, [h(Spinner)]);
const closeBtn = h(Button, { class: 'mx-3 justify-center', innerHTML: 'Закрыть', onClick: close });
const proceedBtn = h(Button, { class: 'mx-3 justify-center', innerHTML: 'продолжить', color: 'red', onClick: proceed });
const actions = h('div', { class: 'mt-5 sm:mt-6 flex justify-center items-end' }, [closeBtn, proceedBtn]);

const ConfirmDialog = defineComponent({
  render() {
    return h(
      Dialog,
      { open: true, onClose: close, type: success.value ? 'success' : 'danger', icon: icon.value },
      {
        title: () => resultMsg.value ?? title.value,
        text: () => (!resultMsg.value ? h(loading.value ? spinner : h('span', text.value)) : null),
        actions: () => (!resultMsg.value ? actions : null),
      },
    );
  },
});

const newConfirmDialogApp = () => createApp(ConfirmDialog);

const open = (_onYesFunction, _text, _title, _type) => {
  proceedFunction.value = _onYesFunction;
  text.value = _text ?? defaultDialogOptions.text;
  title.value = _title ?? defaultDialogOptions.title;
  success.value = _type ?? false;

  ConfirmDialogApp = newConfirmDialogApp();
  ConfirmDialogApp.mount('#sto-confirm');

  timer = setTimeout(close, import.meta.env.STO_CONFIRM_DIALOG_TTL);
};

const drop = (...args) => {
  icon.value = TrashIcon;
  open(...args);
};

export default function useConfirmDialog() {
  return {
    loading,
    title,
    text,
    success,

    close,
    open,
    drop,
  };
}
