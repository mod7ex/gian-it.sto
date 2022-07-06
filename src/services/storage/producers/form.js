import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import RawForm from '~/components/Partials/storage/producers/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/storage/producers';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import formRules from '~/validationsRules/carModel';

const { load } = store;

const toaster = useToast();

let producer;
let v$;

const setForm = (payload = {}) => {
  producer.id = payload.id;
  producer.name = payload.name;
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await save.producer(producer);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedProducerForm = async () => {
  const { id } = producer;

  let item = {};
  if (id) item = await $.producer(id);

  setForm(item);
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope(true);

    scope.run(() => {
      const isUpdate = computed(() => !!producer.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].producer),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          producer = reactive({
            id: id ?? '',
            name: '',
          });

          v$ = useVuelidate(formRules(), producer, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        producer = undefined;
      });
    });
  };

  return {
    saveForm,
    producer,
    atMountedProducerForm,
    render: modalUp,
    v$,
  };
}
