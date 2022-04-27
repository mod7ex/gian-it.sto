import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import useAuth from '~/composables/useAuth.js';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import loginValidationsRules from '~/validationsRules/login.js';

const { setUser, setToken, token } = useAuth();
const { apiRequest } = useApi();
const { rules } = loginValidationsRules();

export default function loginHandler() {
  const { router } = useAppRouter();

  const form = reactive({
    email: '',
    password: '',
  });

  const v$ = useVuelidate(rules, form, { $lazy: true });

  const { fetch: call, error, loading, data, errorMsg, responce } = apiRequest('auth/login', {
    method: 'post',
    data: form,
  });

  const onErrResponceMsg = computed(() => errorMsg.value ?? 'Undefined (network?) error');
  const isSuccessAuth = computed(() => !error.value && (!responce.value || data.value?.success));

  const loginUser = async () => {
    v$.value.$touch();

    if (v$.value.$invalid) return;

    v$.value.$reset();

    await call();

    if (!isSuccessAuth.value || !data.value?.api_token) return;

    setToken(data.value.api_token);
    setUser(data.value.user);

    router.push('/dashboard');
  };

  return {
    loginUser,
    v$,
    loading,
    isSuccessAuth,
    onErrResponceMsg,
  };
}

export const authByTokenFromLocalstorage = async (routerInstance) => {
  if (!token.value) return;

  const request = apiRequest('auth/user');

  await request.fetch();

  if (!request.data.value?.user || !request.data.value?.success) return;

  setUser(request.data.value.user);

  routerInstance.push('/dashboard');
};
