import { onScopeDispose } from 'vue';
import useAppRouter from '~/composables/useAppRouter.js';
import store from '~/store/cars/cars';

const { drop } = store;

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
  };
}
