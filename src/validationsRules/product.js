import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  const rules = computed(() => ({
    name: {
      required: helpers.withMessage('Заполните поле', required),
    },

    count: {
      required: helpers.withMessage('Заполните поле', required),
    },
  }));

  return {
    rules,
  };
}
