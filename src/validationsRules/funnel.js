import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите вопрос', required) },
    type: { required: helpers.withMessage('Укажите тип', required) },
  }));
}
