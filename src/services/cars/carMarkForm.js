import { computed, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carMark } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/marks';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const carMarkId = ref();
const carMarkName = ref();

const isModalUp = ref(false);

const isUpdate = computed(() => !!carMarkId.value);

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest();

const setForm = (payload = {}) => {
  carMarkName.value = payload.name;
  carMarkId.value = payload.id;
};

const setModalVisibility = (bool, id) => {
  isModalUp.value = bool ?? false;

  if (bool) reset();

  setForm({ id });
};

const saveForm = async () => {
  reset();

  await call(`/car-marks/${carMarkId.value ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: { name: carMarkName.value },
  });

  if (!success.value) return false;

  await load();

  setModalVisibility(false);

  return toaster.success('Марка автомобиля успешно сохранен');
};

const atMountedCarMarksForm = async () => {
  const id = carMarkId.value;

  let cm = {};
  if (id) cm = await $carMark(id);

  setForm(cm);
};

export default function () {
  return {
    data,
    saveForm,
    responce,
    error,
    loading,
    errorMsg,
    success,
    ready,
    isModalUp,
    carMarkName,
    setModalVisibility,
    atMountedCarMarksForm,
    isUpdate,
  };
}
