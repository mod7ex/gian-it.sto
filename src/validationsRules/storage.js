import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },
    city_id: { required: helpers.withMessage('выберите город', required) },
  }));
}
