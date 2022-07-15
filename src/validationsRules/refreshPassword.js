import { computed } from 'vue';
import { required, sameAs, minLength, helpers } from '@vuelidate/validators';

export default function refreshPasswordValidationsRules(formModel) {
  return computed(() => ({
    password: {
      required: helpers.withMessage('Укажите новый пароль', required),
      minLength: helpers.withMessage(`Пароль должен содержать не менее ${8} символов`, minLength(8)),
    },
    confirmPassword: {
      required: helpers.withMessage('Укажите пароль ещё раз', required),
      sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(formModel.password)),
    },
  }));
}
