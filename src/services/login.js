import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useAuth from '~/composables/useAuth.js';
import useApi from '~/composables/useApi.js';
import useLoginValidationsRules from '~/validationsRules/login.js';

let routerInstance;
const { setUser, setToken } = useAuth();
const { axiosInstance } = useApi();
const { rules } = useLoginValidationsRules();
const isErrorResponse = ref(false);
const errorResponseMessage = ref('');
const isLoading = ref(false);

function cleanErrors() {
  isErrorResponse.value = false;
  errorResponseMessage.value = '';
}

const form = reactive({
  email: '',
  password: '',
});

const v$ = useVuelidate(rules, form, { $lazy: true });

const loginUser = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }
  v$.value.$reset();

  cleanErrors();
  isLoading.value = true;

  let res;
  try {
    res = await axiosInstance.post('auth/login', {
      email: form.email,
      password: form.password,
    });
  } catch (e) {
    isErrorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    isLoading.value = false;
  }

  if (res?.data?.api_token) {
    setToken(res.data.api_token);
    setUser(res.data.user);
    form.email = '';
    form.password = '';
    routerInstance.push('/dashboard');
  }
};

const authByTokenFromLocalstorage = async () => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    let res;
    try {
      res = await axiosInstance.get('auth/user', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
    } catch (e) {
      console.error('Error request', e?.response?.data);
    }
    if (res?.data?.user) {
      setToken(savedToken);
      setUser(res.data.user);
      routerInstance.push('/dashboard');
    }
  }
};
export default function useLogin(router) {
  routerInstance = router;
  return {
    loginUser,
    authByTokenFromLocalstorage,
    v$,
    isLoading,
    isErrorResponse,
    errorResponseMessage,
  };
}
