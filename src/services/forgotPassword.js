import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useForgotPasswordValidationsRules from '~/validationsRules/forgotPassword.js';

const { axiosInstance } = useApi();
const { rules } = useForgotPasswordValidationsRules();
const refreshPageTitle = ref('Забыли пароль?');
const loading = ref(false);
const successResponse = ref(false);
const successResponseMessage = ref('');
const errorResponse = ref(false);
const errorResponseMessage = ref('');

const form = reactive({
  email: '',
});

const v$ = useVuelidate(rules, form);

function cleanErrors() {
  errorResponse.value = false;
  errorResponseMessage.value = '';
  v$.value.$reset();
}

const refresh = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  cleanErrors();
  loading.value = true;
  let response;
  try {
    response = await axiosInstance.post('auth/password/email', {
      email: form.email,
    });
    if (response.data) {
      successResponse.value = true;
      successResponseMessage.value = form.email.value;
      refreshPageTitle.value = response.data.message;
    }
  } catch (e) {
    errorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    loading.value = false;
  }
};
export default function useForgotPassword() {
  return {
    refresh,
    v$,
    refreshPageTitle,
    loading,
    successResponse,
    successResponseMessage,
    errorResponse,
    errorResponseMessage,
  };
}
