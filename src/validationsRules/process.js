import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите вопрос', required) },
    // question: { required: helpers.withMessage('Укажите имя', required) },
    appeal_reason_id: { required: helpers.withMessage('Выберите причину обращения', required) },
  }));
}
