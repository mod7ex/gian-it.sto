import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useAuth from '~/composables/useAuth.js';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import loginValidationsRules from '~/validationsRules/login.js';

const { setUser, setToken, token, userRole } = useAuth();
const { apiRequest } = useApi();
const { rules } = loginValidationsRules();

export default function loginHandler() {
  const { router } = useAppRouter();

  const form = reactive({ // defaults
    email: 'admin@admin.ru',
    password: 'password',
  });

  const v$ = useVuelidate(rules, form, { $lazy: true });

  const { call, data, loading, errorMsg, success, reset } = apiRequest('auth/login', {
    method: 'post',
    data: form,
  });

  const loginUser = async () => {
    reset();

    v$.value.$touch();

    if (v$.value.$invalid) return;

    v$.value.$reset();

    await call();

    if (!success.value || !data.value?.api_token) return;

    setToken(data.value.api_token);
    setUser(data.value.user);

    if (userRole.value?.name === 'slecar') {
      return router.go({ name: 'WorkerTasks' });
    }

    // router.go({ name: 'Dashboard' }); // better to use go then push, in order to pull up the token from local storage
    router.go({ name: 'Orders' });
  };

  return {
    loginUser,
    v$,
    loading,
    success,
    errorMsg,
  };
}

export const authByTokenFromLocalstorage = async (routerInstance) => {
  if (!token.value) return;

  const { call, data, success } = apiRequest('auth/user');

  await call();

  if (!data.value?.user || !success.value) return;

  setUser(data.value.user);

  // routerInstance.push({ name: 'Dashboard' });
  routerInstance.push({ name: 'Orders' });
};
