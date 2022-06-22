import { computed, reactive } from 'vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/processes/why';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/processes/WhyForm.vue';
import communicate from '~/helpers/communicate';

const { load } = store;

const toaster = useToast();

const why = reactive({
  id: '',
  name: '',
});

const isUpdate = computed(() => !!why.id);

const setForm = (payload = {}) => {
  why.id = payload.id;
  why.name = payload.name;
};

const saveForm = async () => {
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

  let cm = {};
  if (id) cm = await $.appeal_reason(id);

  setForm(cm);
};

export default function () {
  const { render } = useModalForm({
    title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].appeal_reason),
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    render,
    why,
    atMounted,
    isUpdate,
  };
}
