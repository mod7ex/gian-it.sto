import axios from 'axios';
import { watch, ref, computed } from 'vue';
import useAuth from '~/composables/useAuth.js';

const { token } = useAuth();

const instance = axios.create({
  baseURL: 'http://api.sto-test.ru/api/',
  timeout: 30000,
});

watch(
  () => token.value,
  (v) => {
    instance.defaults.headers.common.Authorization = v
      ? `Bearer ${v}`
      : null;
  },
  {
    immediate: true,
  },
);

const apiRequest = (url, config = {}) => {
  const data = ref();
  const responce = ref();
  const error = ref();
  const loading = ref(false);

  const errorMsg = computed(() => {
    if (!error.value) return null;

    if (error.value.response) {
      return error.value.response?.data?.message ?? 'Something went wrong with responce!';
    } if (error.value.request) {
      return error.value.request?.message ?? 'Something went wrong with request!';
    }
    return error.value.message;
  });

  const success = computed(() => !error.value && (!responce.value || !!data.value.success));

  const call = async () => {
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

  return { call, data, responce, error, loading, errorMsg, success };
};

export default function useApi() {
  return {
    axiosInstance: instance, apiRequest,
  };
}
