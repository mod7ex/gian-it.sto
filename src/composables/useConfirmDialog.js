import { defineComponent, h, createApp, effectScope, toRefs, reactive } from 'vue';
import { TrashIcon } from '@heroicons/vue/outline';
import Dialog from '@/UI/Dialog.vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';

const DEFAULTS = {
  loading: false,
  title: 'Подтверждаете удаление ?',
  text: '',
  resultMsg: null,
  success: true,
  icon: null,
};

const spinner = h('div', { class: 'my-5 flex justify-center' }, [h(Spinner)]);

const handler = (...args) => {
  const scope = effectScope(true);

  scope.run(() => {
    let proceed_function;

    const { loading, title, text, resultMsg, success, icon } = toRefs(reactive({ ...DEFAULTS }));

    let timer;
    let ConfirmDialogApp;

    const close = () => {
      clearTimeout(timer);

      if (!ConfirmDialogApp) return;
      ConfirmDialogApp.unmount();
      ConfirmDialogApp = undefined;
      scope.stop();
    };

    const proceed = async () => {
      loading.value = true;

      try {
        let result;

        if (proceed_function instanceof Function) result = await proceed_function();
        else result = {};

        success.value = result?.success ?? false;
        resultMsg.value = result?.message ?? 'Что-то пошло не так !';
      } finally {
        loading.value = false;
        icon.value = null;
      }
    };

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
      proceed_function = _onYesFunction;
      text.value = _text ?? DEFAULTS.text;
      title.value = _title ?? DEFAULTS.title;
      success.value = _type ?? false;

      ConfirmDialogApp = newConfirmDialogApp();
      ConfirmDialogApp.mount('#sto-confirm');

      timer = setTimeout(close, import.meta.env.VITE_CONFIRM_DIALOG_TTL);
    };

    icon.value = TrashIcon;
    open(...args);
  });
};

const simple = (...args) => {
  const scope = effectScope(true);

  scope.run(() => {
    let proceed_function;

    const { title, text, icon } = toRefs(reactive({ ...DEFAULTS }));

    let timer;
    let ConfirmDialogApp;

    const close = () => {
      clearTimeout(timer);
      icon.value = null;

      if (!ConfirmDialogApp) return;
      ConfirmDialogApp.unmount();
      ConfirmDialogApp = undefined;
      scope.stop();
    };

    const proceed = async () => {
      try {
        if (proceed_function instanceof Function) await proceed_function();
      } finally {
        close();
      }
    };

    const closeBtn = h(Button, { class: 'mx-3 justify-center', innerHTML: 'Закрыть', onClick: close });
    const proceedBtn = h(Button, { class: 'mx-3 justify-center', innerHTML: 'продолжить', color: 'red', onClick: proceed });
    const actions = h('div', { class: 'mt-5 sm:mt-6 flex justify-center items-end' }, [closeBtn, proceedBtn]);

    const ConfirmDialog = defineComponent({
      render() {
        return h(
          Dialog,
          { open: true, onClose: close, type: 'danger', icon: icon.value },
          {
            title: () => title.value,
            text: () => text.value,
            actions: () => actions,
          },
        );
      },
    });

    const newConfirmDialogApp = () => createApp(ConfirmDialog);

    const open = (_onYesFunction, _text, _title) => {
      proceed_function = _onYesFunction;
      text.value = _text ?? DEFAULTS.text;
      title.value = _title ?? DEFAULTS.title;

      ConfirmDialogApp = newConfirmDialogApp();
      ConfirmDialogApp.mount('#sto-confirm');

      timer = setTimeout(close, import.meta.env.VITE_CONFIRM_DIALOG_TTL);
    };

    icon.value = TrashIcon;
    open(...args);
  });
};

export default () => ({
  drop: handler,
  simple,
});
