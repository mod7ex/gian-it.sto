import { ref, computed } from 'vue';
import { required, sameAs, minLength, helpers } from '@vuelidate/validators';

export default function refreshPasswordValidationsRules(formModel) {
  const fieldLength = ref(8);

  const rules = computed(() => ({
    password: {
      required: helpers.withMessage('Укажите новый пароль', required),
      minLength: helpers.withMessage(`Пароль должен содержать не менее ${fieldLength.value} символов`, minLength(fieldLength)),
    },
    confirmPassword: {
      required: helpers.withMessage('Укажите пароль ещё раз', required),
      sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(formModel.password)),
    },
  }));

  return {
    rules,
  };
}
