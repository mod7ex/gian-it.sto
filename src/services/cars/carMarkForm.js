import { computed, reactive } from 'vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/marks';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/cars/CarMarkRawForm.vue';

const { load } = store;

const toaster = useToast();

const mark = reactive({
  id: '',
  name: '',
});

const isUpdate = computed(() => !!mark.id);

const setForm = (payload = {}) => {
  mark.id = payload.id;
  mark.name = payload.name;
};

const saveForm = async () => {
  const { message, success } = await save.car_mark(mark);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success('Марка автомобиля успешно сохранен');
    }
  }
};

const atMountedCarMarksForm = async () => {
  const { id } = mark;

  let cm = {};
  if (id) cm = await $.car_mark(id);

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
    mark,
    atMountedCarMarksForm,
    isUpdate,
  };
}
