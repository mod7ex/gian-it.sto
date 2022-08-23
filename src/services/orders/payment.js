import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Payment.vue';
import PayModal from '@/Partials/orders/form/Raw/PayModal.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import store from '~/store/orders/payment';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import departments from '~/store/departments';
import { generateShapedIdfromId } from '~/helpers';

const paymentWaysOptions = [{ label: 'Наличный', value: 'cache' }, { label: 'Безналичный', value: 'cashless' }];

const toaster = useToast();

const { state, load, drop, setStatus } = store;
const { current } = departments;

let invoice;
let fetchPayments;
let saveForm;

const clearMemo = () => { fetchPayments = undefined; };

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
    fetchPayments = async () => { await load({ order_id }); };
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
            status: 'wait',
            sum: '',
            comment: '',
            client_id: '',
            order_id: '',
          });

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
        },
      });

      render(...args);

      onScopeDispose(() => { invoice = undefined; saveForm = undefined; });
    });
  };

  const pay = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const { render } = useModalForm({
        title: 'Оплатить',
        RawForm: PayModal,
        atSubmit: async () => {
          const { message, success } = await save.finance({
            name: `Оплата #${generateShapedIdfromId(invoice.id)}`,
            operation_type: 'in',
            sum: invoice.sum,
            // finance_group_id: 1,
            order_id: args[1],
            department_id: current.value,
          });

          if (!success) return { success, message };

          // this is not accurate
          const { success: suc, message: msg } = await save.payment({ ...invoice, status: 'done' });
          if (suc) setStatus(invoice.id, 'done');

          try {
            return { message: message || msg, success: success && suc };
          } finally {
            if (success && suc) {
              toaster.success(message || msg);
            }
          }
        },
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
      }, { left: 'Отменить', right: 'Оплатить' });

      render(...args);
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
    pay,
    clearMemo,
  };
}
