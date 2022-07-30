import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },

    operation_type: { required: helpers.withMessage('Выберите тип', required) },

    sum: { required: helpers.withMessage('Укажите сумму', required) },

    finance_group_id: { required: helpers.withMessage('Выберите финансовую группу', required) },

    order_id: { required: helpers.withMessage('Выберите Заказ', required) },
  }));
}
