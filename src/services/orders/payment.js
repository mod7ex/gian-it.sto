import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Payment.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import store from '~/store/orders/payment';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

const paymentWaysOptions = [{ label: 'Наличный', value: 'cache' }, { label: 'Безналичный', value: 'cashless' }];

const toaster = useToast();

const { state, load, drop } = store;

let invoice;
let fetchPayments;
let saveForm;

const setForm = (payload = {}) => {
  invoice.id = payload?.id;
  invoice.client_id = payload?.client?.id;
  invoice.order_id = payload?.order?.id;
  invoice.type = payload?.type;
  invoice.comment = payload?.comment;
  invoice.status = payload?.status;
  invoice.sum = payload?.sum;
};

const atMounted = async () => {
  const { id } = invoice;

  if (id) {
    const dep = await $.payment(id);
    setForm(dep || {});
  }
};

export default function (order_id) {
  if (!fetchPayments) {
    fetchPayments = async () => {
      await load({ order_id });
    };

    saveForm = async () => {
      const { message, success } = await save.payment(invoice);

      try {
        return { message, success };
      } finally {
        if (success) {
          await load({ order_id });
          toaster.success(message);
        }
      }
    };
  }

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!invoice.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].invoice),
        RawForm,
        atSubmit: () => saveForm(order_id),
        atClose: () => scope.stop(),
        atOpen: (id) => {
          invoice = reactive({
            id: id ?? '',
            type: '',
            status: '',
            sum: '',
            comment: '',
            client_id: '',
            order_id: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => { invoice = undefined; });
    });
  };

  return {
    fetchPayments,
    saveForm,
    invoice,
    atMounted,
    render: modalUp,
    state,
    paymentWaysOptions,
    dropPayment: drop,
  };
}
