import axios from 'axios';
import { watch } from 'vue';
import useAuth from '~/composables/useAuth.js';

const { token } = useAuth();

const instance = axios.create({
  baseURL: 'http://api.sto-test.ru/api/',
  timeout: 10000,
});

watch(token, (changedToken) => {
  instance.defaults.headers.common.Authorization = (changedToken) ? `Bearer ${changedToken}` : null;
});

export default function useApi() {
  return {
    axiosInstance: instance,
  };
}
