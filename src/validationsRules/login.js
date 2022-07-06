import { computed } from 'vue';
import { required, email, helpers } from '@vuelidate/validators';

export default function loginValidationsRules() {
  return {
    rules: computed(() => ({
      email: {
        required: helpers.withMessage('Укажите email', required),
        email: helpers.withMessage('Укажите верный email', email),
      },
      password: { required: helpers.withMessage('Укажите пароль', required) },
    })),
  };
}
