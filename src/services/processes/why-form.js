import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/processes/why';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/processes/WhyForm.vue';
import communicate from '~/helpers/communicate';
import { whyRules } from '~/validationsRules/process';

const { load } = store;

const toaster = useToast();

let why;
let v$;

const setForm = (payload = {}) => {
  why.id = payload.id;
  why.name = payload.name;
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await save.appeal_reason(why);

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
  const { id } = why;

  if (id) {
    const cm = await $.appeal_reason(id);
    setForm(cm || {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!why.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].appeal_reason),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          why = reactive({
            id: id ?? '',
            name: '',
          });

          v$ = useVuelidate(whyRules(), why, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        why = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    render: modalUp,
    why,
    atMounted,
    v$,
  };
}
