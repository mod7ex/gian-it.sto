import { computed, reactive, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carModel } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/models';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const carModel = reactive({
  id: undefined,
  name: undefined,
  car_mark_id: undefined,
});

const isModalUp = ref(false);

const isUpdate = computed(() => !!carModel.id);

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest();

const setForm = (payload = {}) => {
  carModel.id = payload.id;
  carModel.name = payload.name;
  carModel.car_mark_id = payload.car_mark?.id;
};

const setModalVisibility = (bool, id) => {
  isModalUp.value = bool ?? false;

  if (bool) reset();

  setForm({ id });
};

const saveForm = async () => {
  reset();

  await call(`/car-models/${carModel.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: carModel,
  });

  if (!success.value) return false;

  await load();

  setModalVisibility(false);

  return toaster.success('Mодель автомобиля успешно сохранен');
};

const atMountedCarModelsForm = async () => {
  const { id } = carModel;

  let cm = {};
  if (id) cm = await $carModel(id);

  setForm(cm);
};

export default function carModelFormService() {
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
    setModalVisibility,
    atMountedCarModelsForm,
    isUpdate,
    carModel,
  };
}
