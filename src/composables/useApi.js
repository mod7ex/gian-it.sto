import axios from 'axios';
import { watch, ref, computed } from 'vue';
import useAuth from '~/composables/useAuth.js';

const { token } = useAuth();

const instance = axios.create({
  baseURL: 'http://api.sto-test.ru/api/',
  timeout: 30000,
});

watch(token, (changedToken) => {
  instance.defaults.headers.common.Authorization = changedToken
    ? `Bearer ${changedToken}`
    : null;
});

const apiRequest = (url, config = {}) => {
  const data = ref();
  const responce = ref();
  const error = ref();
  const loading = ref(false);

  const errorMsg = computed(() => {
    if (!error.value) return null;

    if (error.value.response) {
      return error.value.response?.data?.message;
    } if (error.value.request) {
      return error.value.request?.message ?? 'Something went wrong!';
    }
    return error.value.message;
  });

  const fetch = async () => {
    loading.value = true;

    try {
      const result = await instance.request({
        url,
        ...config,
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

  return {
    fetch,
    data,
    responce,
    error,
    loading,
    errorMsg,
  };
};

export default function useApi() {
  return {
    axiosInstance: instance, apiRequest,
  };
}
