import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import useAuth from '~/composables/useAuth.js';
import useApi from '~/composables/useApi.js';

let routerInstance;
const { setUser, setToken } = useAuth();
const { axiosInstance } = useApi();
const errorResponse = ref(false);
const errorResponseMessage = ref('');
const loading = ref(false);

function cleanErrors() {
  errorResponse.value = false;
  errorResponseMessage.value = '';
}

const form = reactive({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Укажите email', required),
    email: helpers.withMessage('Укажите верный email', email),
  },
  password: { required: helpers.withMessage('Укажите пароль', required) },
}));

const v$ = useVuelidate(rules, form, { $lazy: true });

const login = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }
  v$.value.$reset();

  cleanErrors();
  loading.value = true;

  let res;
  try {
    res = await axiosInstance.post('auth/login', {
      email: form.email,
      password: form.password,
    });
  } catch (e) {
    errorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    loading.value = false;
  }

  if (res?.data?.api_token) {
    setToken(res.data.api_token);
    setUser(res.data.user);
    form.email = '';
    form.password = '';
    routerInstance.push('/dashboard');
  }
};

const checkLogin = async () => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    try {
      const res = await axiosInstance.get('auth/user', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      setToken(savedToken);
      setUser(res.data.user);
      routerInstance.push('/dashboard');
    } catch (e) {
      console.error('Error request', e?.response?.data);
    }
  }
};
export default function useLogin(router) {
  routerInstance = router;
  return {
    login,
    checkLogin,
    cleanErrors,
    v$,
    loading,
  };
}
