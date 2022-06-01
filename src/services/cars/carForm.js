import { ref, reactive } from 'vue';
// import useVuelidate from '@vuelidate/core';
// import carFormValidationsRules from '~/validationsRules/carForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

import { $car } from '~/helpers/fetch.js';

let routeInstance;
let isEditCarPage;
let redirectBack;
// let v$;

const { apiRequest } = useApi();
const toaster = useToast();

const carFields = reactive({
  number: '',
  vin: '',
  year: '',
  The: '',
  body: '',
  color: '',
  notes: '',
  fuel_id: '',
  engine_volume_id: '',
  client_id: '',
  car_model_id: '',
});

const theSelectedCarMark = ref();

/* ************ Car form ************ */

const saveRawcarFields = async () => {
  const { call, data, errorMsg, success } = apiRequest(`/cars/${isEditCarPage.value ? routeInstance.params.id : ''}`, {
    method: isEditCarPage.value ? 'put' : 'post',
    data: carFields,
  });

  await call();

  if (success.value) toaster.success('данные автомобиля успешно сохранены');
  else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, Не удалось сохранить данные автомобиля !');

  return data.value?.car?.id;
};

const saveCar = async () => {
  // const isValideForm = await v$.value.$validate();

  // if (!isValideForm) return;

  // v$.value.$reset();

  const id = await saveRawcarFields();

  if (!id) return;

  redirectBack();

  return !!id;
};

const setCarField = function (key) {
  if (key.includes('_id')) {
    carFields[key] = this[key.replace('_id', '')]?.id;
    if (key === 'car_model_id') theSelectedCarMark.value = this.car_model?.car_mark?.id;
    return;
  }

  carFields[key] = this[key] ?? '';
};

const setCarForm = async (payload) => {
  Object.keys(carFields).forEach(setCarField, payload);
};

const atMountedCarForm = async () => {
  let car = { client: { id: routeInstance.query.client_id } };

  if (isEditCarPage.value && routeInstance.params.id) {
    car = await $car(routeInstance.params.id);
  }

  await setCarForm(car);
};

export default function () {
  const { route, isThePage, back } = useAppRouter('EditCar');

  [routeInstance, isEditCarPage, redirectBack] = [route, isThePage, back];

  // const { rules } = carFormValidationsRules(carFields, isEditCarPage.value);

  // v$ = useVuelidate(rules, carFields, { $lazy: true });

  return {
    carFields,
    isEditCarPage,
    saveCar,
    setCarForm,
    atMountedCarForm,
    theSelectedCarMark,
  };
}
