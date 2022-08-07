import { onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import store from '~/store/cars/cars';

const { drop, fill, reset, cars } = store;

const fetchCars = async (bool = false) => {
  if (bool) reset();
  await fill();
};

let redirect;
let isEditCarPage;
let redirectBack;

/* ************ Delete Car ************ */
const dropCar = async (id) => {
  const { success, message } = await drop(id);

  isEditCarPage.value && success && redirectBack();

  return { success, message };
};

/* ************ To Update car page ************ */
const moveToEditCarPage = async (id) => {
  await redirect({ name: 'EditCar', params: { id } });
};

export default function () {
  const { redirectTo, isThePage, back } = useAppRouter('EditCar');

  [redirect, isEditCarPage, redirectBack] = [redirectTo, isThePage, back];

  onScopeDispose(() => {
    redirect = undefined;
    isEditCarPage = undefined;
    redirectBack = undefined;
  });

  return {
    moveToEditCarPage,
    dropCar,
    fetchCars,
    cars,
  };
}
