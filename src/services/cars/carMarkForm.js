import { computed, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carMark } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/marks';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/cars/CarMarkRawForm.vue';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const carMarkId = ref();
const carMarkName = ref();

const isUpdate = computed(() => !!carMarkId.value);

const setForm = (payload = {}) => {
  carMarkName.value = payload.name;
  carMarkId.value = payload.id;
};

const saveForm = async () => {
  const { call, errorMsg, success } = apiRequest();

  await call(`/car-marks/${carMarkId.value ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: { name: carMarkName.value },
  });

  try {
    return { message: errorMsg.value, success: success.value };
  } finally {
    if (success.value) {
      await load();
      toaster.success('Марка автомобиля успешно сохранен');
    }
  }
};

const atMountedCarMarksForm = async () => {
  const id = carMarkId.value;

  let cm = {};
  if (id) cm = await $carMark(id);

  setForm(cm);
};

export default function () {
  const { render } = useModalForm({
    title: `${isUpdate.value ? 'Oбновляете' : 'Создайте'} марка автомобиля`,
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    render,
    carMarkName,
    atMountedCarMarksForm,
    isUpdate,
  };
}
