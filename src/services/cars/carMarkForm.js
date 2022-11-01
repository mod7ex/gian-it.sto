import { computed, reactive, onScopeDispose, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/cars/marks';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/cars/CarMarkRawForm.vue';
import communicate from '~/helpers/communicate';
import { carMarks as formRules } from '~/validationsRules/carModel';

const { add } = store;

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

  const { message, success, data } = await save.car_mark(mark);

  try {
    return { message, success, data };
  } finally {
    if (success) {
      add(data.car_mark);
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

export default function (mount_point, cb) {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!mark.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].car_mark),
        RawForm,
        mount_point,
        atSubmit: async () => {
          const { data } = await saveForm();
          if (cb) cb(data);
          return data;
        },
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
