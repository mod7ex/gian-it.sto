import axios from 'axios';
import { ref, computed, watchEffect } from 'vue';
import useAuth, { logOut } from '~/composables/useAuth';

const { token } = useAuth();

const instance = axios.create({
  baseURL: import.meta.env.STO_API_BASE_URI,
  timeout: import.meta.env.STO_API_TIMEOUT,
});

// for test token TTL
/*
setTimeout(() => {
  token.value = '';
  instance.defaults.headers.common.Authorization = null;
}, 30000);
*/

watchEffect(() => { instance.defaults.headers.common.Authorization = token.value ? `Bearer ${token.value}` : null; });

const apiRequest = (url, config = {}) => {
  const data = ref();
  const responce = ref();
  const error = ref();
  const loading = ref(false);

  // ready ==> request was sent and we recieved responce either error or success
  const ready = computed(() => !!responce.value || !!error.value);
  const success = computed(() => {
    if (!ready.value) return true;

    if (data.value?.success) return true;

    if (responce.value?.statusText === 'OK') return true;

    if (Math.floor((responce.value?.status ?? 0) / 100) === 2) return true;

    return false;
  });
  // const success = computed(() => ready.value && !!data.value?.success); // is also a valid approach
  /*
    we should change templates & js files based on what is success definition here
    do we consider success status when request isn't sent yet or not
  */

  const errorMsg = computed(() => {
    if (!error.value) return null;

    if (error.value.response) {
      if (__STO_DEV__) {
        return error.value.response?.data?.message ?? 'Что-то пошло не так с ответом !';
      }
      return 'Что-то пошло не так с ответом !';
    } if (error.value.request) {
      if (__STO_DEV__) {
        return error.value.request?.message ?? 'Что-то пошло не так с запросом !';
      }
      return 'Что-то пошло не так с запросом !';
    }

    if (__STO_DEV__) {
      return error.value.message;
    }
    return 'Что-то пошло не так !';
  });

  const reset = () => {
    data.value = undefined;
    responce.value = undefined;
    error.value = undefined;
    loading.value = false;
  };

  const call = async (onTheFlyURL, onTheFlyConfig = {}) => {
    loading.value = true;

    try {
      const result = await instance.request({
        url: onTheFlyURL ?? url,
        ...{ ...config, ...onTheFlyConfig },
      });
      responce.value = result;
      data.value = result.data;
    } catch (e) {
      error.value = e;
      if (__STO_DEV__) {
        console.log('Error; ', e);
        console.log('Error message; ', errorMsg.value);
      }
    } finally {
      loading.value = false;

      if (error.value?.request && error.value.request.status === 401) logOut();
    }
  };

  return { call, data, responce, error, loading, errorMsg, success, reset, ready };
};

export default function useApi() {
  return {
    apiRequest, axiosInstance: instance,
  };
}
