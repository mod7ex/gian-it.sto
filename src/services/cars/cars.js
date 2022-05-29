import { ref, computed } from 'vue';
import useApi from '~/composables/useApi.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $cars } from '~/helpers/fetch.js';

import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

const hasPermission = userHasAtLeastOnePermission(['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']);

let redirect;
let isEditCarPage;
let redirectBack;

const { apiRequest } = useApi();

const rawCars = ref([]);
const cars = computed(() => rawCars.value.map(({ id, car_model, vin, number, client }) => ({ id, car_model: car_model?.name, vin, number, client: { name: `${client?.name} ${client?.surname}`, id: client?.id } })));

const fetchCars = async () => {
  if (!hasPermission) return;
  rawCars.value = await $cars({});
};

/* ************ Delete Car ************ */
const deleteCar = (id) => {
  rawCars.value.splice(
    rawCars.value.findIndex((dep) => dep.id === id),
    1,
  );
};

const dropCar = async (id) => {
  const { call, errorMsg, success } = apiRequest(`cars/${id}`, { method: 'delete' });

  await call();

  success.value && deleteCar(id);

  const deletionMsg = success.value ? 'Автомобили успешно удален' : (errorMsg.value ?? 'Не удалось удалить Автомобили !');

  isEditCarPage.value && redirectBack();

  return { message: deletionMsg, success: success.value };
};

/* ************ To Update car page ************ */
const movetoEditCarPage = async (id) => {
  await redirect({ name: 'EditCar', params: { id } });
};

export default function carsService() {
  const { redirectTo, isThePage, back } = useAppRouter('EditCar');

  [redirect, isEditCarPage, redirectBack] = [redirectTo, isThePage, back];

  return {
    rawCars,
    fetchCars,
    deleteCar,
    movetoEditCarPage,
    dropCar,
    cars,
    hasPermission,
  };
}
