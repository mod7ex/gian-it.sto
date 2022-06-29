import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import forgotPasswordValidationsRules from '~/validationsRules/forgotPassword.js';

const { apiRequest } = useApi();
const { rules } = forgotPasswordValidationsRules();

const form = reactive({
  email: '',
});

const v$ = useVuelidate(rules, form);

const { call, data, loading, errorMsg, success, reset, ready } = apiRequest('auth/password/email', {
  method: 'post',
  data: form,
});

const refreshPassword = async () => {
  reset();

  v$.value.$touch();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  await call();
};

export default function () {
  return {
    refreshPassword,
    v$,
    data,
    form,
    loading,
    success,
    errorMsg,
    ready,
  };
}
