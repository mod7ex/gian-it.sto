import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import useRefreshPasswordValidationsRules from '~/validationsRules/refreshPassword.js';
import useApi from '~/composables/useApi.js';

const { axiosInstance } = useApi();

const form = reactive({
  email: '',
  token: '',
  password: '',
  confirmPassword: '',
});
const { rules } = useRefreshPasswordValidationsRules(form);

const refreshPageTitle = ref('Придумайте новый пароль');
const isLoading = ref(false);
const isSuccessResponse = ref(false);
const successResponseMessage = ref('');
const isErrorResponse = ref(false);
const errorResponseMessage = ref('');

const v$ = useVuelidate(rules, form);

function cleanErrors() {
  isErrorResponse.value = false;
  errorResponseMessage.value = '';
  v$.value.$reset();
}

const saveNewPassword = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  v$.value.$reset();
  cleanErrors();
  isLoading.value = true;

  try {
    const response = await axiosInstance.post('auth/password/reset', {
      token: form.token,
      email: form.email,
      password: form.password,
    });
    if (response.data) {
      isSuccessResponse.value = true;
      successResponseMessage.value = 'Теперь вы можете войти с новым паролем';
      refreshPageTitle.value = response.data.message;
    }
  } catch (e) {
    isErrorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    isLoading.value = false;
  }
};

export default function useRefreshPassword() {
  return {
    saveNewPassword,
    form,
    v$,
    refreshPageTitle,
    isLoading,
    isSuccessResponse,
    successResponseMessage,
    isErrorResponse,
    errorResponseMessage,
  };
}
