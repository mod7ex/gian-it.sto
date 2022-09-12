import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import RawForm from '~/components/Partials/storage/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/storage';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import formRules from '~/validationsRules/storage';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { add } = store;

const toaster = useToast();

let storage;
let v$;

const setForm = (payload = {}) => {
  storage.id = payload.id;
  storage.name = payload.name;
  storage.city_id = payload.city?.id;
};

const atMounted = async () => {
  const { id } = storage;

  if (id) {
    const item = await $.storage(id);
    setForm(item ?? {});
  }
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success, data } = await save.storage(storage);

  try {
    return { message, success };
  } finally {
    if (success) {
      if (data.storage.department?.id == current.value) {
        add(data.storage);
      }
      toaster.success(message);
    }
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope(true);

    scope.run(() => {
      const isUpdate = computed(() => !!storage?.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].storage),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          storage = reactive({
            id: id ?? '',
            name: '',
            department_id: current.value,
          });
          v$ = useVuelidate(formRules(), storage, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        storage = undefined;
      });
    });
  };

  return {
    storage,
    atMounted,
    render: modalUp,
    v$,
    current,
  };
}
