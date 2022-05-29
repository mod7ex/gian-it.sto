import { computed } from 'vue';
import { email, required, helpers } from '@vuelidate/validators';

const { isArray } = Array;

const isValidPhone = (num) => num.length === 16;

const arrayValidator = (validator) => function (value) {
  if (!isArray(value)) return false;
  if (value.length === 0) return false;

  if (value.active) {
    // eslint-disable-next-line no-param-reassign
    value.invalide = value.active;
    return validator(value[value.active]);
  }

  for (let i = 0; i < value.length; i++) {
    if (!validator(value[i])) {
      // eslint-disable-next-line no-param-reassign
      value.invalide = i;
      return false;
    }
  }

  return Reflect.deleteProperty(value, 'invalide') || true;

  // if (value.active) return validator(value[value.active]);
  // return value.reduce((previousValue, currentValue) => previousValue && validator(currentValue), true);
};

const mails = arrayValidator(email.$validator);
const phoned = arrayValidator(isValidPhone);

export default function clientFormValidationsRules() {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },
    surname: { required: helpers.withMessage('Укажите фамилия', required) },

    emails: {
      mails: helpers.withMessage('Укажите верный email', mails),
    },
    phones: {
      isArray,
      phoned: helpers.withMessage('Укажите верный телефон', phoned),
    },

    // email: {
    //   required: helpers.withMessage('Укажите email', required),
    //   email: helpers.withMessage('Укажите верный email', email),
    // },

    department_id: {
      required: helpers.withMessage('Укажите отделение', required),
    },
  }));
}
