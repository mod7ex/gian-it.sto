import { computed, reactive, onScopeDispose, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/marks';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/cars/CarMarkRawForm.vue';
import communicate from '~/helpers/communicate';
import formRules from '~/validationsRules/carModel';

const { load } = store;

const toaster = useToast();

let mark;
let v$;

const setForm = (payload = {}) => {
  mark.id = payload.id;
  mark.name = payload.name;
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await save.car_mark(mark);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedCarMarksForm = async () => {
  const { id } = mark;

  if (id) {
    const cm = await $.car_mark(id);
    setForm(cm);
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!mark.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].car_mark),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          mark = reactive({
            id: id ?? '',
            name: '',
          });

          v$ = useVuelidate(formRules(), mark, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        mark = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    render: modalUp,
    mark,
    atMountedCarMarksForm,
    v$,
  };
}
