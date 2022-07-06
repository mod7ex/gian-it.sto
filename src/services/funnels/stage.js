import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import RawForm from '~/components/Partials/funnels/stages/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/pipelines/stages';
import _$ from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import formRules from '~/validationsRules/stage';

const { load } = store;

const toaster = useToast();

let stage;
let pipeline_id;
let v$;

const setForm = (payload = {}) => {
  stage.id = payload.id;
  stage.name = payload.name;
  stage.color = payload.color;
  stage.pipeline_id = payload.pipeline_id;
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await _$.stage(stage);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load(pipeline_id);
      toaster.success(message);
    }
  }
};

const atMounted = async () => {
  const { id } = stage;

  if (id) {
    const item = await $.stage(id);
    setForm(item ?? {});
  }
};

const modalUp = (...args) => {
  const scope = effectScope();

  scope.run(() => {
    const isUpdate = computed(() => !!stage?.id);

    const { render } = useModalForm({
      title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].stage),
      RawForm,
      atSubmit: () => saveForm(pipeline_id),
      atClose: () => scope.stop(),
      atOpen: (id) => {
        stage = reactive({
          id: id ?? '',
          name: '',
          color: '',
          pipeline_id,
        });

        v$ = useVuelidate(formRules(), stage, { $lazy: true });
      },
    });

    render(...args);

    onScopeDispose(() => {
      stage = undefined;
      v$ = undefined;
    });
  });
};

export default function (v) {
  if (v) pipeline_id = v;

  return {
    stage,
    atMounted,
    render: modalUp,
    v$,
  };
}
