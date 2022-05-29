import { ref, computed, reactive } from 'vue';
// import useVuelidate from '@vuelidate/core';
// import carFormValidationsRules from '~/validationsRules/carForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
// import departments from '~/services/departments/departments';
import { $clients, $car, $carModels, $carMarks, $carEngines, $carFuels } from '~/helpers/fetch.js';

// const { currentDepartment } = departments();

let routeInstance;
let isEditCarPage;
let redirectBack;
// let v$;

const { apiRequest } = useApi();
const toaster = useToast();

const defaultCarFields = {
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
};

const carFields = reactive(defaultCarFields);

const theSelectedCarMark = ref();

/* ************ Clients & Marks & Models & Engines & Fuels ************ */
const rawClients = ref([]);
const rawMarks = ref([]);
const rawModels = ref([]);
const rawEngines = ref([]);
const rawFuels = ref([]);

const clientOptions = computed(() => rawClients.value.map((item) => ({
  value: item.id,
  label: `${item.name} ${item.surname}`,
})));

const markOptions = computed(() => rawMarks.value.map((item) => ({
  value: item.id,
  label: item.name,
})));

const modelOptions = computed(() => (() => {
  if (theSelectedCarMark.value) {
    return rawModels.value.filter(({ car_mark }) => car_mark?.id === Number(theSelectedCarMark.value));
  }
  return rawModels.value;
})().map((item) => ({
  value: item.id,
  label: item.name,
})));

const engineOptions = computed(() => rawEngines.value.map((item) => ({
  value: item.id,
  label: item.value,
})));

const fuelOptions = computed(() => rawFuels.value.map((item) => ({
  value: item.id,
  label: item.name,
})));

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

  // rawClients.value = await $clients({ department_id: currentDepartment.value });
  rawClients.value = await $clients();
  rawModels.value = await $carModels();
  rawMarks.value = await $carMarks();
  rawEngines.value = await $carEngines();
  rawFuels.value = await $carFuels();
};

export default function carFormService() {
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
    clientOptions,
    markOptions,
    modelOptions,
    engineOptions,
    fuelOptions,
    theSelectedCarMark,
  };
}
