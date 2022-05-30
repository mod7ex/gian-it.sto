/*
  composable needs some work might be used later
*/

import { defineComponent, h, ref, createApp } from 'vue';
import Modal from '@/Partials/ModalForm.vue';
// import Button from '@/UI/Button.vue';
// import DialogModal from '@/UI/DialogModal.vue';
// import Spinner from '@/UI/Spinner.vue';
import useSuspense from '~/composables/useSuspense.js';

let theAction;
let app;
let timer;
// let ConfirmDialogApp;

const DEFAULT_MODAL_OPTIONS = {
  loading: false,
  success: true,
  ready: false,
  open: false,
  errorMsg: undefined,
};

const loading = ref();
const errorMsg = ref();
const success = ref();
const ready = ref();
const open = ref();

const reset = () => {
  loading.value = DEFAULT_MODAL_OPTIONS.loading;
  errorMsg.value = DEFAULT_MODAL_OPTIONS.errorMsg;
  success.value = DEFAULT_MODAL_OPTIONS.success;
  ready.value = DEFAULT_MODAL_OPTIONS.ready;
  open.value = DEFAULT_MODAL_OPTIONS.open;

  theAction = undefined;
  app = undefined;
};

const close = async () => {
  clearTimeout(timer);

  if (!app) return;
  app.unmount();
  reset();
};

const onSubmit = async () => {
  if (!theAction) return;

  console.log(theAction);

  loading.value = false;

  try {
    const result = await theAction();

    success.value = result?.success ?? false;

    if (!success.value) errorMsg.value = result?.message;
  } catch (error) {
    success.value = false;

    console.log(error);
  } finally {
    loading.value = false;

    if (close && success.value) await close();

    ready.value = true;
  }
};

const comp = (path, title) => defineComponent({
  setup() {
    const RawForm = () => import(path);

    return () => h(
      Modal,
      {
        loading: loading.value,
        errorMsg: errorMsg.value,
        success: success.value,
        ready: ready.value,
        open: true,
        onClose: close,
        onSubmit: () => onSubmit(),
      },
      {
        form: () => h(useSuspense(RawForm), { loadingMsg: 'loading...' }),
        title: () => title,
      },
    );
  },
});

export default ({ path, action, title }) => {
  reset();

  theAction = action;

  app = createApp(comp(path, title));

  app.mount('#sto-confirm');

  timer = setTimeout(close, import.meta.env.STO_CONFIRM_DIALOG_TTL);
};
