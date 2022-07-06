import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },
    car_mark_id: { required: helpers.withMessage('Выберите марку автомобиля', required) },
  }));
}
