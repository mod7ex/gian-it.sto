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

const { call, data, loading, errorMsg, success, reset, reponce, ready } = apiRequest('auth/password/reset', {
  method: 'post',
  data: form,
});

const save = async () => {
  v$.value.$touch();

  reset();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  await call();
};

export default function useRefreshPassword() {
  return {
    save,
    form,
    v$,
    loading,
    success,
    errorMsg,
    data,
    reponce,
    ready,
  };
}
