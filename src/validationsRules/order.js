import { computed } from 'vue';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  return computed(() => ({ order_stage_id: { required: helpers.withMessage('Выберите этап', required) } }));
}
