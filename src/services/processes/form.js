import { computed, reactive, effectScope, onScopeDispose, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes';
import communicate from '~/helpers/communicate';
import useToast from '~/composables/useToast.js';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/processes/RawForm.vue';
import formRules from '~/validationsRules/process';

const toaster = useToast();

const { load } = store;

let v$;
let process;
let appeal_reason_id;

const setField = function (key) {
  if (key.includes('_id')) {
    process[key] = this[key.replace('_id', '')]?.id;
    return;
  }
  process[key] = this[key] ?? '';
};

const setForm = (payload = {}) => {
  Object.keys(process).forEach(setField, payload);
};

const saveForm = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { message, success } = await save.process_category({ ...process, appeal_reason_id: appeal_reason_id.value });

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
  const { id } = process;

  if (id != null) {
    const cm = await $.process_category(id);
    setForm(cm);
  }
};

const clearAppealReason = () => {
  appeal_reason_id = undefined;
};

export default (v) => {
  if (!appeal_reason_id) {
    if (v != null) {
      appeal_reason_id = ref(v);
    }
  }

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!process?.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].process_category),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          process = reactive({
            id: id ?? '',
            name: '',
          });

          v$ = useVuelidate(formRules(), process, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => { process = undefined; });
    });
  };

  return {
    render: modalUp,
    process,
    atMounted,
    v$,
    clearAppealReason,
    appeal_reason_id,
  };
};
