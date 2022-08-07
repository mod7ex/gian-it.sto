import { defineComponent, h, createApp, ref, isRef } from 'vue';
import Actions from '@/Layout/modal/FormActions.vue';
import useSuspense from '~/composables/useSuspense';
import { sleep } from '~/helpers';
import Modal from '@/Layout/modal/Modal.vue';

// atSubmit is a function that has an object return containing the success and message result
export default ({ title, RawForm, atSubmit, atClose, atOpen, keepAfterSubmit } = {}) => ({
  render: async (...args) => {
    let app;

    const loading = ref(false);
    const show = ref(false);
    const message = ref();
    const SuspenseArea = useSuspense();

    const onClose = async () => {
      show.value = false;

      await sleep(300);

      if (app) {
        app.unmount();
        app = undefined;
      }

      if (atClose) await atClose();
    };

    const onSubmited = async () => {
      message.value = undefined;

      let res = {};

      loading.value = true;
      try {
        res = await atSubmit();
      } finally {
        loading.value = false;
      }

      if (!keepAfterSubmit && res?.success) {
        await onClose();
        return;
      }

      message.value = res?.message;
    };

    app = createApp(defineComponent({
      setup() {
        return () => h(
          Modal,
          { onClose, open: show.value, title: isRef(title) ? title.value : title, message: message.value }, // onOutclick: onClose
          {
            default: () => h(SuspenseArea, {}, { default: () => (show.value ? h(RawForm) : null) }),
            actions: () => h(Actions, { onClose, onSubmited, loading: loading.value }),
          },
        );
      },
    }));

    if (atOpen instanceof Function) await atOpen(...args);

    app.mount('#sto-modal');

    show.value = true;
  },
});
