import { computed, reactive, effectScope, onScopeDispose, shallowRef } from 'vue';
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
import usePay from '~/composables/usePay';

const toaster = useToast();

const { state, load, add, drop, setStatus } = store;
const { current } = departments;

let invoice;
let fetchPayments;
let saveForm;

let typesMapper;
let payment_types;

const clearMemo = () => {
  fetchPayments = undefined;
  typesMapper = undefined;
  payment_types = undefined;
};

const setForm = (payload = {}) => {
  invoice.id = payload?.id;
  invoice.client_id = payload?.client?.id;
  invoice.order_id = payload?.order?.id;
  invoice.payment_type = payload?.payment_type;
  invoice.operation_type = payload?.operation_type;
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
    typesMapper = shallowRef({});
    payment_types = computed(() => Object.entries(typesMapper.value.payments ?? {}).map(([value, label]) => ({ label, value })));
  }

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!invoice.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].payment),
        RawForm,
        atSubmit: () => saveForm(order_id),
        atClose: () => scope.stop(),
        atOpen: (id) => {
          invoice = reactive({
            id: id ?? '',
            status: 'wait',
            payment_type: '',
            operation_type: 'sell',
            type: 'in', // remove later
            sum: '',
            comment: '',
            client_id: '',
            order_id: '',
          });

          saveForm = async () => {
            const { message, success, data } = await save.payment(invoice);

            try {
              return { message, success };
            } finally {
              if (success) {
                add(data.payment);
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

  const pay = (item) => {
    const scope = effectScope();

    // scope.cleanups.push(() => {
    //   typesMapper = undefined;
    //   payment_types = undefined;
    // });

    scope.run(() => {
      const { pay: make_payment } = usePay({ resource: 'paymennt', cb: setStatus });

      const { render } = useModalForm({
        title: 'Оплатить',
        RawForm: PayModal,
        atSubmit: async () => {
          const { message, success } = await save.finance({
            name: `Оплата #${generateShapedIdfromId(invoice.id)}`,
            operation_type: invoice.operation_type ?? 'sell',
            payment_type: invoice.payment_type ?? 'cash',
            sum: invoice.sum,
            // finance_group_id: 1,
            order_id: invoice.order_id,
            department_id: current.value,
          });

          if (!success) return { success, message };

          const { success: suc, payment_log } = await make_payment(invoice?.id);
          console.log(payment_log);

          try {
            return { message: message || 'что-то пошло не так', success: suc };
          } finally {
            if (suc) {
              toaster.success(message);
            }
          }
        },

        atClose: () => scope.stop(),

        atOpen: ({ id /* operation_type, payment_type, status, sum, client, comment, order */ }) => {
          invoice = reactive({
            id,
            // status,
            // payment_type,
            // operation_type,
            // sum,
            // comment,
            // client_id: client?.id,
            // order_id: order?.id,
          });
        },
      }, { left: 'Отменить', right: 'Оплатить' });

      render(item);
    });
  };

  return {
    fetchPayments,
    saveForm,
    invoice,
    atMounted,
    render: modalUp,
    state,
    dropPayment: drop,
    pay,
    clearMemo,
    typesMapper,
    payment_types,
  };
}
