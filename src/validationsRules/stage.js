import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите вопрос', required) },
    color: { required: helpers.withMessage('Выберите цвет', required) },
  }));
}
