import { shallowRef } from 'vue';
import { sleep } from '~/helpers';
import $ from '~/helpers/fetch';

export default ({ resource = 'finances', cb = () => { } }) => {
  const statusRef = shallowRef(false);

  const checkStatus = async (id) => {
    if (statusRef.value) return;
    statusRef.value = true;
    const data = await $({ key: `${resource}/${id}/payment-status` });
    if (data.success) cb(id, data[`${resource}_log`].data?.response?.results[0]?.status ?? 'error');
    // await sleep(5000);
    // cb(id, 'ready');
    statusRef.value = false;
    return data;
  };

  const paymentRef = shallowRef(false);

  const pay = async (id) => {
    if (paymentRef.value) return;
    paymentRef.value = true;
    const data = await $({ key: `${resource}/${id}/payment` });
    if (data.success) cb(id, data[`${resource}_log`].data?.response?.results[0]?.status ?? 'error');
    // await sleep(5000);
    // cb(id, 'inprogress');
    paymentRef.value = false;
    return data;
  };

  return {
    pay, checkStatus, statusRef, paymentRef,
  };
};
