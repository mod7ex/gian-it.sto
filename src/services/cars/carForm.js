import { reactive, onScopeDispose, effectScope, computed, shallowRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import formRules from '~/validationsRules/carForm.js';
import useAppRouter from '~/composables/useAppRouter.js';
import RawForm from '~/components/Partials/cars/CarFormFields.vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';
import carStore from '~/store/cars/cars';

let routeInstance;
let isEditCarPage;
let redirectBack;
let v$;
let modalUp;
let carFields;
let theSelectedCarMark;

/* ************ Car form ************ */

const saveCar = async (_modal = false) => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { success, message, data } = await save.car(carFields, null, true);

  if (_modal) {
    const { load } = carStore;
    try {
      return { message, success };
    } finally {
      if (success) {
        await load({ client_id: data.car.client?.id });
      }
    }
  } else {
    if (!success) return;

    redirectBack();

    return success;
  }
};

const setCarField = function (key) {
  if (key.includes('_id')) {
    carFields[key] = this[key.replace('_id', '')]?.id;
    if (key === 'car_model_id') theSelectedCarMark.value = this.car_model?.car_mark?.id;
    return;
  }

  carFields[key] = this[key] ?? '';
};

const setCarForm = async (payload) => { Object.keys(carFields).forEach(setCarField, payload); };

const prepare = (clientId) => {
  if (carFields) return;

  const { route, isThePage, back } = useAppRouter('EditCar');

  [routeInstance, isEditCarPage, redirectBack] = [route, isThePage, back];

  carFields = reactive({
    id: '',
    number: '',
    vin: '',
    year: '',
    body: '',
    color: '',
    notes: '',
    fuel_id: '',
    engine_volume_id: '',
    client_id: clientId ?? '',
    car_model_id: '',
  });

  theSelectedCarMark = shallowRef();

  v$ = useVuelidate(formRules(), carFields, { $lazy: true });
};

const atMountedCarForm = async (isModal) => {
  if (isModal) return;

  let car = { client: { id: routeInstance?.query?.client_id } };

  if (isEditCarPage.value && routeInstance.params.id) {
    car = await $.car(routeInstance.params.id);
  }

  await setCarForm(car);
};

const clearMemo = () => onScopeDispose(() => {
  routeInstance = undefined;
  isEditCarPage = undefined;
  redirectBack = undefined;
  carFields = undefined;
  theSelectedCarMark = undefined;
  modalUp = undefined;
  v$ = undefined;
});

export default function (_modal = false) {
  if (!_modal) {
    prepare();
    clearMemo();
  } else {
    modalUp = (...args) => {
      const scope = effectScope();

      scope.run(() => {
        const isUpdate = computed(() => !!carFields.id);

        const { render } = useModalForm({
          title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].car),
          RawForm,
          atSubmit: () => saveCar(true),
          atClose: () => scope.stop(),
          atOpen: () => prepare(...args),
        });

        render(...args);

        clearMemo();
      });
    };
  }

  return {
    routeInstance,
    isEditCarPage,
    render: modalUp,
    carFields,
    saveCar: () => saveCar(false),
    atMountedCarForm,
    theSelectedCarMark,
    v$,
  };
}
