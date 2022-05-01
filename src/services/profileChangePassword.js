import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import refreshPasswordValidationsRules from '~/validationsRules/refreshPassword.js';
import useApi from '~/composables/useApi.js';

const { apiRequest } = useApi();

const form = reactive({});
const { rules } = refreshPasswordValidationsRules(form);
const v$ = useVuelidate(rules, form);

const isModalUp = ref(false);
const setModalVisibility = (bool) => {
  isModalUp.value = bool ?? !isModalUp.value;
  form.password = '';
  form.confirmPassword = '';
  v$.value.$reset();
};

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest('profile/password', {
  method: 'put',
  data: form,
});

const changeProfilePassword = async () => {
  reset();

  v$.value.$touch();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  await call();

  if (!success.value) return;

  form.password = '';
  form.confirmPassword = '';
};

export default function profileChangePasswordHandler() {
  return {
    v$,
    changeProfilePassword,
    data,
    responce,
    error,
    loading,
    errorMsg,
    success,
    ready,
    isModalUp,
    setModalVisibility,
    form,
  };
}
