import { defineComponent, h, createApp, ref } from 'vue';
import Actions from '@/Layout/modal/FormActions.vue';
import useSuspense from '~/composables/useSuspense';
import { sleep } from '~/helpers';
import Modal from '@/Layout/modal/Modal.vue';

let app;

export default ({ title, RawForm, submit, atClose, closeAfterSubmit } = {}) => {
  const show = ref(false);
  const loading = ref(false);
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
      res = await submit();
    } finally {
      loading.value = false;
    }

    if (closeAfterSubmit && res?.success) {
      await onClose();
      return;
    }

    message.value = res?.message;
  };

  return {
    render: () => {
      app = createApp(defineComponent({

        setup() {
          return () => h(
            Modal,
            { onClose, open: show.value ?? false, title, message: message.value }, // onOutclick: onClose
            {
              default: () => h(useSuspense(RawForm)),
              actions: () => h(Actions, { onClose, onSubmited, loading: loading.value }),
            },
          );
        },

      }));

      app.mount('#sto-modal');

      show.value = true;
    },
  };
};
