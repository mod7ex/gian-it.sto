import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    client_id: { required: helpers.withMessage('Выберите владельца', required) },
    car_model_id: { required: helpers.withMessage('Выберите модель автомобиля', required) },
  }));
}
