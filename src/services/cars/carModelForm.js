import { computed, reactive } from 'vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/models';
import RawForm from '~/components/Partials/cars/carModelRawForm.vue';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';

const { load } = store;

const toaster = useToast();

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
  const { message, success } = await save.car_model(carModel);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedCarModelsForm = async () => {
  const { id } = carModel;

  let cm = {};
  if (id) cm = await $.car_model(id);

  setForm(cm);
};

export default function carModelFormService() {
  const { render } = useModalForm({
    title: communicate.modal[isUpdate.value ? 'update' : 'create'].car_model,
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
