import { computed, effectScope, onScopeDispose, reactive } from 'vue';
import RawForm from '~/components/Partials/orders/form/Raw/StorageRequest.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch';
import store from '~/store/orders/storage-requests';
import useAppRouter from '~/composables/useAppRouter';

const toaster = useToast();

const { load } = store;

let products_request;

const setForm = (payload = {}) => {
  products_request.id = payload.id;
  products_request.status = payload.status;
  products_request.sum = payload.sum;
  products_request.product_id = payload.product_id;
};

const saveForm = async () => {
  const { message, success } = await save.products_request(products_request);

  try {
    return { message, success };
  } finally {
    if (success) {
      toaster.success(message);
      await load();
    }
  }
};

const atMounted = async () => {
  const { id } = products_request;

  if (id) {
    const dep = await $.products_request(id);
    setForm(dep || {});
  }
};

export default function () {
  const { route } = useAppRouter();

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!products_request.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].products_request),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          products_request = reactive({
            id: id ?? '',
            status: '',
            sum: '',
            order_id: route.params.id,
            product_id: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => { products_request = undefined; });
    });
  };

  return {
    saveForm,
    render: modalUp,
    atMounted,
    products_request,
  };
}
