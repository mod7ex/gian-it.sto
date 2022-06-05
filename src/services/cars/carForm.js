import { ref, reactive } from 'vue';
// import useVuelidate from '@vuelidate/core';
// import carFormValidationsRules from '~/validationsRules/carForm.js';
import useAppRouter from '~/composables/useAppRouter.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

let routeInstance;
let isEditCarPage;
let redirectBack;
// let v$;

const carFields = reactive({
  id: '',
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

const saveCar = async () => {
  // const isValideForm = await v$.value.$validate();

  // if (!isValideForm) return;

  // v$.value.$reset();

  const { success } = await save.car(carFields, null, true);

  if (!success) return;

  redirectBack();

  return success;
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
    car = await $.car(routeInstance.params.id);
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
