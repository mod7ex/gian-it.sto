import { computed, reactive, effectScope, onScopeDispose, ref } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Payment.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';

// import useToast from '~/composables/useToast.js';
// import save from '~/helpers/save';
// import $ from '~/helpers/fetch.js';

// const toaster = useToast();

let invoice;

const setForm = (payload = {}) => {
  invoice.id = payload?.id;
  invoice.client_id = payload?.client?.id;
  invoice.payment_method = payload?.payment_method;
  invoice.comment = payload?.comment;
};

const saveForm = async () => {
  console.log(invoice);
  return { message: 'shit', success: true };

  // const { message, success } = await save.department(department);

  // try {
  //   return { message, success };
  // } finally {
  //   if (success) {
  //     await load();
  //     toaster.success(message);
  //   }
  // }
};

const atMounted = async () => {
  const { id } = invoice;

  if (id) {
    // const dep = await $.department(id);
    // setForm(dep || {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!invoice.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].invoice),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          invoice = reactive({
            id: id ?? '',
            client_id: '',
            payment_method: '',
            comment: '',
          });
        },
      });

      render(...args);

      // onScopeDispose(() => { invoice = undefined; });
    });
  };

  return {
    saveForm,
    invoice,
    atMounted,
    render: modalUp,
  };
}
