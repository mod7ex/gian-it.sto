import { computed } from 'vue';
import { required, helpers, maxLength, minValue } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    client_id: { required: helpers.withMessage('Выберите владельца', required) },
    car_model_id: { required: helpers.withMessage('Выберите модель автомобиля', required) },
    year: { minValue: helpers.withMessage('Год выпуска должен быть больше 1950', minValue(1950)) },
    vin: {
      // required: helpers.withMessage('Введите VIN-номер', required),
      maxLength: helpers.withMessage('максимально допустимое количество символов 20', maxLength(20)),
    },
  }));
}
