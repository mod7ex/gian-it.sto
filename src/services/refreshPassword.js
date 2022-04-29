import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import refreshPasswordValidationsRules from '~/validationsRules/refreshPassword.js';
import useApi from '~/composables/useApi.js';

const { apiRequest } = useApi();

const form = reactive({
  email: '',
  token: '',
  password: '',
  confirmPassword: '',
});

const { rules } = refreshPasswordValidationsRules(form);

const v$ = useVuelidate(rules, form);

const { call, data, loading, errorMsg, success, reset, reponce } = apiRequest('auth/password/reset', {
  method: 'post',
  data: {
    token: form.token,
    email: form.email,
    password: form.password,
  },
});

const saveNewPassword = async () => {
  v$.value.$touch();

  reset();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  await call();
};

export default function useRefreshPassword() {
  return {
    saveNewPassword,
    form,
    v$,
    loading,
    success,
    errorMsg,
    data,
    reponce,
  };
}
