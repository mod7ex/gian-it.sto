import { computed } from 'vue';
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';

export default function employerFormValidationsRules(user, isEditForm = false) {
  const employerFormRules = computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },

    email: {
      required: helpers.withMessage('Укажите email', required),
      email: helpers.withMessage('Укажите верный email', email),
    },

    password: {
      minLength: helpers.withMessage('Не менее 8 символов', minLength(8)),
    },

    password_confirmation: {
      sameAs: helpers.withMessage('Пароли не совпадают', sameAs(user.password)),
    },

    role_id: {
      required: helpers.withMessage('Укажите роль', required),
    },

    department_id: {
      required: helpers.withMessage('Укажите отделение', required),
    },
  }));

  if (!isEditForm) {
    employerFormRules.value.password.required = helpers.withMessage('Укажите пароль', required);
  }

  return {
    rules: employerFormRules,
  };
}
