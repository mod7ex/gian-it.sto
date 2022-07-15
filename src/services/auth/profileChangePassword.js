import { reactive, ref, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import validationRUles from '~/validationsRules/refreshPassword.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast';

const toaster = useToast();

const { apiRequest } = useApi();

let form;
let v$;
let isModalUp;

const setModalVisibility = (bool) => {
  isModalUp.value = bool ?? !isModalUp.value;
  v$.value.$reset();
};

export default () => effectScope().run(() => {
  const { rules } = validationRUles(form);

  if (!form) {
    isModalUp = ref(false);
    form = reactive({});
    v$ = useVuelidate(rules, form, { $lazy: true });
  }

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

    setModalVisibility();

    toaster.success(data.value?.message ?? 'Пароль успешно изменен');
  };

  onScopeDispose(() => {
    form = undefined;
    v$ = undefined;
    isModalUp = undefined;
  });

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
});
