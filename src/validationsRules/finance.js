import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function (v) {
  return computed(() => {
    const rules = {
      name: { required: helpers.withMessage('Укажите имя', required) },

      operation_type: { required: helpers.withMessage('Выберите тип', required) },

      finance_group_id: { required: helpers.withMessage('Выберите финансовую группу', required) },

      payment_type: { required: helpers.withMessage('Выберите Вид оплаты', required) },

      // order_id: { required: helpers.withMessage('Выберите Заказ', required) },
    };

    if (!v) {
      rules.sum = {
        required: helpers.withMessage('Укажите сумму', required),
      };
    }

    return rules;
  });
}
