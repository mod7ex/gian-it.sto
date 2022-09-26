// import { sleep } from '~/helpers';
import useToast from '~/composables/useToast.js';
import useApi from '~/composables/useApi.js';

const toaster = useToast();

export default ({ resource = 'finance', cb = () => { } }) => {
  const { apiRequest } = useApi();

  const { call, data, errorMsg, success, loading, reset, error } = apiRequest();

  const checkStatus = async (id) => {
    if (loading.value) return;
    reset();

    await call(`${resource}s/${id}/payment-status`);
    if (success.value) {
      if (data.value[`${resource}_log`].status) cb(id, data.value[`${resource}_log`].status ?? 'unknown');
      else toaster.warn('Статус не установлен, Не удалось проверить');
    } else if (error.value.response.status == 422) toaster.danger(errorMsg.value);
    else toaster.danger('Что-то пошло не так');

    // await sleep(5000);
    // cb(id, 'ready');
    // return { success: true };

    return { success: success.value, message: errorMsg.value || 'Что-то пошло не так' };
  };

  const pay = async (id) => {
    if (loading.value) return;
    reset();

    await call(`${resource}s/${id}/payment`);
    if (success.value) {
      if (data.value[`${resource}_log`].status) cb(id, data.value[`${resource}_log`].status ?? 'unknown');
      else toaster.warn('Статус не установлен, проверьте, прошел ли платеж');
    } else if (error.value.response.status == 422) toaster.danger(errorMsg.value);
    else toaster.danger('Что-то пошло не так');

    // await sleep(5000);
    // cb(id, 'inprogress');
    // return { success: true };

    return { success: success.value, message: errorMsg.value || 'Что-то пошло не так' };
  };

  return { pay, checkStatus, loading };
};
