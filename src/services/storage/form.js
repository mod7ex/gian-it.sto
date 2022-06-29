import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '~/components/Partials/storage/RawForm.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/storage';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

let storage;

const setForm = (payload = {}) => {
  storage.id = payload.id;
  storage.name = payload.name;
  storage.city_id = payload.city?.id;
};

const atMountedStorageForm = async () => {
  const { id } = storage;

  if (id) {
    const item = await $.storage(id);
    setForm(item ?? {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope(true);

    scope.run(() => {
      const { load } = store;

      const toaster = useToast();

      const isUpdate = computed(() => !!storage?.id);

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

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].storage),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          storage = reactive({
            id: id ?? '',
            name: '',
            city_id: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => {
        storage = undefined;
      });
    });
  };

  return {
    storage,
    atMountedStorageForm,
    render: modalUp,
  };
}
