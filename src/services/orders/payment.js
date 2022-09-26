import { reactive, effectScope } from 'vue';
import PayModal from '@/Partials/orders/form/Raw/PayModal.vue';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import $ from '~/helpers/fetch.js';

const toaster = useToast();

let invoice;
let typesMapper;

const clearMemo = () => {
  invoice = undefined;
};

const setForm = (payload = {}) => {
  invoice.id = payload?.id;
  invoice.order_id = payload?.order?.id;
  invoice.payment_type = payload?.payment_type;
  invoice.operation_type = payload?.operation_type;
  invoice.sum = payload?.sum;
};

const atMounted = async () => {
  const { id } = invoice;

  if (id) {
    const dep = await $.finance(id);
    setForm(dep || {});
  }
};

export default function (v) {
  if (!typesMapper) typesMapper = v;

  const pay = (item, make_payment) => {
    const scope = effectScope();

    scope.cleanups.push(clearMemo);

    scope.run(() => {
      const { render } = useModalForm({
        title: 'Оплатить',
        RawForm: PayModal,
        atSubmit: async () => {
          const { success, message } = await make_payment(); // 1 - make payment

          try {
            return { message: message || 'что-то пошло не так', success: true };
          } finally {
            if (success) toaster.success('Платеж прошел успешно');
          }
        },

        atClose: () => scope.stop(),

        atOpen: ({ id /* operation_type, payment_type, status, sum, client, comment, order */ }) => {
          if (!invoice) invoice = reactive({ id });
        },
      }, { left: 'Отменить', right: 'Оплатить' });

      render(item);
    });
  };

  return {
    invoice,
    pay,
    atMounted,
    clearMemo,
    typesMapper,
  };
}
