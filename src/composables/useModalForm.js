import { defineComponent, h, createApp, ref } from 'vue';
import Actions from '@/Layout/modal/FormActions.vue';
import useSuspense from '~/composables/useSuspense';
import { sleep } from '~/helpers';
import Modal from '@/Layout/modal/Modal.vue';

let app;

export default ({ title, RawForm, atSubmit, atClose, atOpen, keepAfterSubmit } = {}) => {
  // atSubmit is a function that has an object return containing the success and message result

  const suspenseArea = useSuspense(RawForm);
  const loading = ref(false);
  const show = ref(false);
  const message = ref();

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

  return {
    render: async (...args) => {
      app = createApp(defineComponent({

        setup() {
          return () => h(
            Modal,
            { onClose, open: show.value, title, message: message.value }, // onOutclick: onClose
            {
              default: () => h(suspenseArea),
              actions: () => h(Actions, { onClose, onSubmited, loading: loading.value }),
            },
          );
        },

      }));

      app.mount('#sto-modal');

      await atOpen(...args);

      show.value = true;
    },
  };
};
