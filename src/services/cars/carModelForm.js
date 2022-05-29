import { computed, reactive, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carModel, $carMarks } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import carModelsService from './carModels';

const { fetchCarModels } = carModelsService();

const toaster = useToast();

const { apiRequest } = useApi();

const carModel = reactive({
  id: undefined,
  name: undefined,
  car_mark_id: undefined,
});

/* ********************* Car marks ********************* */
const rawCarMarks = ref([]);
const carMarkOptions = computed(() => rawCarMarks.value.map(({ id, name }) => ({ value: id, label: name })));

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

  await fetchCarModels();

  setModalVisibility(false);

  return toaster.success('Mодель автомобиля успешно сохранен');
};

const atMountedCarModelsForm = async () => {
  const { id } = carModel;

  let cm = {};
  if (id) cm = await $carModel(id);
  rawCarMarks.value = await $carMarks();

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
    carMarkOptions,
  };
}
