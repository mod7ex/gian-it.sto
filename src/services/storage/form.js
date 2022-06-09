import { computed, reactive } from 'vue';
import RawForm from '~/components/Partials/storage/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/storage';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

const { load } = store;

const toaster = useToast();

const storage = reactive({
  id: '',
  name: '',
  city_id: '',
});

const isUpdate = computed(() => !!storage.id);

const setForm = (payload = {}) => {
  storage.id = payload.id;
  storage.name = payload.name;
  storage.city_id = payload.city?.id;
};

const saveForm = async () => {
  const { message, success } = await save.storage(storage);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedStorageForm = async () => {
  const { id } = storage;

  let item = {};
  if (id) item = await $.storage(id);

  setForm(item);
};

export default function () {
  const { render } = useModalForm({
    title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].storage),
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    saveForm,
    storage,
    atMountedStorageForm,
    render,
  };
}
