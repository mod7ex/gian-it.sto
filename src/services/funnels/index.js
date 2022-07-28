import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import RawForm from '~/components/Partials/funnels/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/pipelines';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import formRules from '~/validationsRules/funnel';

const { load } = store;

const toaster = useToast();

let pipeline;
let v$;

const setForm = (payload = {}) => {
  pipeline.id = payload.id;
  pipeline.name = payload.name;
  pipeline.type = payload.type;
};

const atMounted = async () => {
  const { id } = pipeline;

  if (id) {
    const item = await $.pipeline(id);
    setForm(item ?? {});
  }
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await save.pipeline(pipeline);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope(true);

    scope.run(() => {
      const isUpdate = computed(() => !!pipeline?.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].pipeline),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          pipeline = reactive({
            id: id ?? '',
            name: '',
            type: 'task',
          });

          v$ = useVuelidate(formRules(), pipeline, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        pipeline = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    pipeline,
    atMounted,
    render: modalUp,
    v$,
  };
}
