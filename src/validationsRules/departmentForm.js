import { computed } from 'vue';
import { required, minLength, helpers } from '@vuelidate/validators';

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Укажите Название', required),
    minLength: helpers.withMessage('не менее 5 символов', minLength(5)),
  },

}));

export default function departmentFormRules() {
  return {
    rules,
  };
}
