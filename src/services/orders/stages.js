import { computed, reactive, effectScope, onScopeDispose } from 'vue';
// import useVuelidate from '@vuelidate/core';
import RawForm from '~/components/Partials/orders/form/Raw/Stages.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/orders/stages';
import _$ from '~/helpers/save';
import $ from '~/helpers/fetch.js';
// import formRules from '~/validationsRules/stage';

const { load } = store;

const toaster = useToast();

let order_stage;
// let v$;

const setForm = (payload = {}) => {
  order_stage.id = payload.id;
  order_stage.name = payload.name;
  order_stage.color = payload.color;
};

const saveForm = async () => {
  // const isValideForm = await v$.value.$validate();

  // if (!isValideForm) return;

  // v$.value.$reset();

  const { message, success } = await _$.order_stage(order_stage);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMounted = async () => {
  const { id } = order_stage;

  if (id) {
    const item = await $.order_stage(id);
    setForm(item ?? {});
  }
};

const modalUp = (...args) => {
  const scope = effectScope();

  scope.run(() => {
    const isUpdate = computed(() => !!order_stage?.id);

    const { render } = useModalForm({
      title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].order_stage),
      RawForm,
      atSubmit: () => saveForm(),
      atClose: () => scope.stop(),
      atOpen: (id) => {
        order_stage = reactive({
          id: id ?? '',
          name: '',
          color: '',
        });

        // v$ = useVuelidate(formRules(), stage, { $lazy: true });
      },
    });

    render(...args);

    onScopeDispose(() => {
      order_stage = undefined;
      // v$ = undefined;
    });
  });
};

export default function () {
  return {
    order_stage,
    atMounted,
    render: modalUp,
    // v$,
  };
}
