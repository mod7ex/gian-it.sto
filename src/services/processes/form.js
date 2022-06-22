import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes';
import communicate from '~/helpers/communicate';
import useToast from '~/composables/useToast.js';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/processes/RawForm.vue';

let process;

export default () => effectScope().run(() => {
  const { load } = store;

  const toaster = useToast();

  const isUpdate = computed(() => !!process?.id);

  const setField = function (key) {
    if (key.includes('_id')) {
      process[key] = this[key.replace('_id', '')]?.id;
      return;
    }
    process[key] = this[key] ?? '';
  };

  const setForm = (payload = {}) => {
    Object.getOwnPropertyNames(process).forEach(setField, payload);
  };

  const saveForm = async () => {
    const { message, success } = await save.process_category(process);

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

    if (id) {
      const cm = await $.process_category(id);
      setForm(cm);
    }
  };

  const { render } = useModalForm({
    title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].process_category),
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => {
      process = reactive({
        id: '',
        name: '',
        appeal_reason_id: '',
      });
      setForm({ id });
    },
  });

  onScopeDispose(() => {
    process = undefined;
  });

  return {
    render,
    process,
    atMounted,
    isUpdate,
  };
});
