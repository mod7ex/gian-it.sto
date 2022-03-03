import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import refreshPasswordValidationsRules from '~/validationsRules/refreshPassword.js';
import useApi from '~/composables/useApi.js';

const { axiosInstance } = useApi();

const form = reactive({
  password: '',
  confirmPassword: '',
});
const { rules } = refreshPasswordValidationsRules(form);

const isLoading = ref(false);
const isSuccessResponse = ref(false);
const successResponseMessage = ref('');
const isErrorResponse = ref(false);
const errorResponseMessage = ref('');

const v$ = useVuelidate(rules, form);

function closeModalChangePassword() {
  isLoading.value = false;
  successResponseMessage.value = '';
  isSuccessResponse.value = false;
  isErrorResponse.value = false;
  errorResponseMessage.value = '';
  form.password = '';
  form.confirmPassword = '';
  v$.value.$reset();
}

const changeProfilePassword = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  v$.value.$reset();
  isLoading.value = true;
  let response;
  try {
    response = await axiosInstance.put('profile/password', {
      password: form.password,
    });
  } catch (e) {
    isErrorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    isLoading.value = false;
  }
  if (response.data.success) {
    form.password = '';
    form.confirmPassword = '';
    isSuccessResponse.value = true;
    successResponseMessage.value = 'Пароль обновлён';
  }
};

export default function useProfileChangePasswordModal() {
  return {
    changeProfilePassword,
    closeModalChangePassword,
    v$,
    isLoading,
    isSuccessResponse,
    successResponseMessage,
    isErrorResponse,
    errorResponseMessage,
  };
}
