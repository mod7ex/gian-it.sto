import { reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import validationRUles from '~/validationsRules/refreshPassword.js';
import useToast from '~/composables/useToast';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/PasswordChangeRawForm.vue';
import { rootSave } from '~/helpers/save';

const toaster = useToast();

let form;
let v$;

const saveForm = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;

  v$.value.$reset();

  const { message, success } = await rootSave('profile/password', form, 'PUT');

  try {
    return { message, success };
  } finally {
    if (success) toaster.success(message ?? 'Пароль успешно обновлен');
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const { render } = useModalForm({
        title: 'Изменить пароль',
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: () => {
          form = reactive({});
          const rules = validationRUles(form);

          v$ = useVuelidate(rules, form, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        form = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    saveForm,
    render: modalUp,
    v$,
    form,
  };
}
