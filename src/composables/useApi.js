import axios from 'axios';
import { ref, computed, watchEffect } from 'vue';
import useAuth from '~/composables/useAuth.js';

// eslint-disable-next-line no-underscore-dangle
const __STO_DEV__ = import.meta.env.MODE === 'development';

const { token } = useAuth();

const instance = axios.create({
  baseURL: import.meta.env.STO_API_BASE_URI,
  timeout: import.meta.env.STO_API_TIMEOUT,
});

watchEffect(() => { instance.defaults.headers.common.Authorization = token.value ? `Bearer ${token.value}` : null; });

const apiRequest = (url, config = {}) => {
  const data = ref();
  const responce = ref();
  const error = ref();
  const loading = ref(false);

  // ready ==> request was sent and we recieved responce either error or success
  const ready = computed(() => !!responce.value || !!error.value);

  const success = computed(() => !ready.value || (ready.value && !!data.value?.success));
  // const success = computed(() => ready.value && !!data.value?.success); // is also a valid approach

  /*
    we should change templates & js files based on what is success definition here
    do we consider success status when request isn't sent yet or not
  */

  /*
    const errorMsg = computed(() => {
      if (!error.value) return null;

      if (error.value.response) {
        return error.value.response?.data?.message ?? 'Что-то пошло не так с ответом !';
      } if (error.value.request) {
        return error.value.request?.message ?? 'Что-то пошло не так с запросом !';
      }
      return error.value.message;
    });
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
      console.log('Error; ', e);
      console.log('Error message; ', errorMsg.value);
    } finally {
      loading.value = false;
    }
  };

  /*

  const get = async (onTheFlyURL, onTheFlyConfig = {}) => {
    loading.value = true;

    try {
      const result = await instance.get(onTheFlyURL ?? url, { ...config, ...onTheFlyConfig });
      responce.value = result;
      data.value = result.data;
    } catch (e) {
      error.value = e;
      console.log('Error; ', e);
      console.log('Error message; ', errorMsg.value);
    } finally {
      loading.value = false;
    }
  };

  const post = async (onTheFlyURL, onTheFlyConfig = {}) => {
    loading.value = true;

    try {
      const result = await instance.post(onTheFlyURL ?? url, { ...config, ...onTheFlyConfig });
      responce.value = result;
      data.value = result.data;
    } catch (e) {
      error.value = e;
      console.log('Error; ', e);
      console.log('Error message; ', errorMsg.value);
    } finally {
      loading.value = false;
    }
  };

*/

  return { call, data, responce, error, loading, errorMsg, success, reset, ready };
};

export default function useApi() {
  return {
    apiRequest, axiosInstance: instance,
  };
}
