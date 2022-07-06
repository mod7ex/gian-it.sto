import { computed, reactive, onScopeDispose, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/models';
import RawForm from '~/components/Partials/cars/carModelRawForm.vue';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';
import formRules from '~/validationsRules/carModel';

const { load } = store;

const toaster = useToast();

let v$;
let carModel;

const setForm = (payload = {}) => {
  carModel.id = payload.id;
  carModel.name = payload.name;
  carModel.car_mark_id = payload.car_mark?.id;
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

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

  if (id) {
    const cm = await $.car_model(id);
    setForm(cm);
  }
};

export default function carModelFormService() {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!carModel.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].car_model),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          carModel = reactive({
            id: id ?? '',
            name: '',
            car_mark_id: '',
          });

          v$ = useVuelidate(formRules(), carModel, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        carModel = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    render: modalUp,
    atMountedCarModelsForm,
    carModel,
    v$,
  };
}
