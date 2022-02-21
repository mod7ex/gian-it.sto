import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useForgotPasswordValidationsRules from '~/validationsRules/forgotPassword.js';

const { axiosInstance } = useApi();
const { rules } = useForgotPasswordValidationsRules();
const refreshPageTitle = ref('Забыли пароль?');
const isLoading = ref(false);
const isSuccessResponse = ref(false);
const successResponseMessage = ref('');
const isErrorResponse = ref(false);
const errorResponseMessage = ref('');

const form = reactive({
  email: '',
});

const v$ = useVuelidate(rules, form);

function cleanErrors() {
  isErrorResponse.value = false;
  errorResponseMessage.value = '';
  v$.value.$reset();
}

const refreshPassword = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  cleanErrors();
  isLoading.value = true;
  let response;
  try {
    response = await axiosInstance.post('auth/password/email', {
      email: form.email,
    });
    if (response.data) {
      isSuccessResponse.value = true;
      successResponseMessage.value = form.email.value;
      refreshPageTitle.value = response.data.message;
    }
  } catch (e) {
    isErrorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    isLoading.value = false;
  }
};
export default function useForgotPassword() {
  return {
    refreshPassword,
    v$,
    refreshPageTitle,
    isLoading,
    isSuccessResponse,
    successResponseMessage,
    isErrorResponse,
    errorResponseMessage,
  };
}
