import { shallowRef } from 'vue';
// import { sleep } from '~/helpers';
import $ from '~/helpers/fetch';
import useToast from '~/composables/useToast.js';

const toaster = useToast();

export default ({ resource = 'finance', cb = () => { } }) => {
  const statusRef = shallowRef(false);

  const checkStatus = async (id) => {
    if (statusRef.value) return;
    statusRef.value = true;

    try {
      const data = await $({ key: `${resource}s/${id}/payment-status`, toast: false });
      if (data.success) cb(id, data[`${resource}_log`].status ?? 'unknown');
      else toaster.danger('Что-то пошло не так');
      // await sleep(5000);
      // cb(id, 'ready');
      return data;
    } finally {
      statusRef.value = false;
    }
  };

  const paymentRef = shallowRef(false);

  const pay = async (id) => {
    if (paymentRef.value) return;
    paymentRef.value = true;

    try {
      const data = await $({ key: `${resource}s/${id}/payment`, toast: false });
      if (data.success) cb(id, data[`${resource}_log`].status ?? 'unknown');
      else toaster.danger('Платеж не прошел');
      // await sleep(5000);
      // cb(id, 'inprogress');
      return data;
    } finally {
      paymentRef.value = false;
    }
  };

  return {
    pay, checkStatus, statusRef, paymentRef,
  };
};
