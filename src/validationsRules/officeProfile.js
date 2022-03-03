import { computed } from 'vue';
import { required, email, helpers } from '@vuelidate/validators';

export default function officeProfileValidationsRules() {
  const rules = computed(() => ({
    email: {
      required: helpers.withMessage('Заполните поле', required),
      email: helpers.withMessage('Укажите верный email', email),
    },
    name: {
      required: helpers.withMessage('Заполните поле', required),
    },
  }));

  return {
    rules,
  };
}
