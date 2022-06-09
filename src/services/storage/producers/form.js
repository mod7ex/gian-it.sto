import { computed, reactive } from 'vue';
import RawForm from '~/components/Partials/storage/producers/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/storage/producers';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

const { load } = store;

const toaster = useToast();

const producer = reactive({
  id: '',
  name: '',
});

const isUpdate = computed(() => !!producer.id);

const setForm = (payload = {}) => {
  producer.id = payload.id;
  producer.name = payload.name;
};

const saveForm = async () => {
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
  const { render } = useModalForm({
    title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].producer),
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    saveForm,
    producer,
    atMountedProducerForm,
    render,
  };
}
