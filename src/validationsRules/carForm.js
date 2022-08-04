import { computed } from 'vue';
import { required, helpers, maxLength } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    client_id: { required: helpers.withMessage('Выберите владельца', required) },
    car_model_id: { required: helpers.withMessage('Выберите модель автомобиля', required) },
    vin: {
      // required: helpers.withMessage('Введите VIN-номер', required),
      maxLength: helpers.withMessage('максимально допустимое количество символов 20', maxLength(20)),
    },
  }));
}
