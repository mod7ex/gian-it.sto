import { computed, reactive } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carModel } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/models';
import RawForm from '~/components/Partials/cars/carModelRawForm.vue';
import useModalForm from '~/composables/useModalForm';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const carModel = reactive({
  id: undefined,
  name: undefined,
  car_mark_id: undefined,
});

const isUpdate = computed(() => !!carModel.id);

const setForm = (payload = {}) => {
  carModel.id = payload.id;
  carModel.name = payload.name;
  carModel.car_mark_id = payload.car_mark?.id;
};

const saveForm = async () => {
  const { call, errorMsg, success } = apiRequest();

  await call(`/car-models/${carModel.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: carModel,
  });

  try {
    return { message: errorMsg.value, success: success.value };
  } finally {
    if (success.value) {
      await load();
      toaster.success('Mодель автомобиля успешно сохранен');
    }
  }
};

const atMountedCarModelsForm = async () => {
  const { id } = carModel;

  let cm = {};
  if (id) cm = await $carModel(id);

  setForm(cm);
};

export default function carModelFormService() {
  const { render } = useModalForm({
    title: `${isUpdate.value ? 'Oбновляете' : 'Создайте'} Модель автомобиля`,
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    render,
    atMountedCarModelsForm,
    carModel,
  };
}
