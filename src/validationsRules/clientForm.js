import { computed } from 'vue';
import { email, required, helpers } from '@vuelidate/validators';

const isValidPhone = (num) => num.length === 16;

const arrayValidator = (validator) => function (value) {
  console.log(('he'));
  if (!Array.isArray(value) || value.length === 0) return false;

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
};

const requiredArr = arrayValidator(required.$validator);
const mails = arrayValidator(email.$validator);
const phoned = arrayValidator(isValidPhone);

export default function () {
  return computed(() => ({
    name: { required: helpers.withMessage('Укажите имя', required) },
    surname: { required: helpers.withMessage('Укажите фамилия', required) },

    emails: {
      mails: helpers.withMessage('Укажите верный email', mails),
      requiredArr: helpers.withMessage('Укажите email', requiredArr),
    },
    phones: {
      requiredArr: helpers.withMessage('Укажите телефон', requiredArr),
      phoned: helpers.withMessage('Укажите верный телефон', phoned),
    },

    department_id: {
      required: helpers.withMessage('Укажите отделение', required),
    },
  }));
}
