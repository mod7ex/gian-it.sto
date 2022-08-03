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

function setField(key) {
  if (key.includes('_id')) {
    if (key === 'storage_id') {
      products_request.storage_id = this?.product?.storage?.id;
      return;
    }

    products_request[key] = this[key.replace('_id', '')]?.id;
    return;
  }
  products_request[key] = this[key];
}

const setForm = (payload = {}) => {
  Object.keys(products_request).forEach(setField, payload);
};

const saveForm = async (order_id) => {
  const { message, success } = await save.products_request(products_request);

  try {
    return { message, success };
  } finally {
    if (success) {
      toaster.success(message);
      await load({ order_id });
    }
  }
};

const atMounted = async () => {
  const { id } = products_request;

  if (!id) return;

  const { success, product_request } = await $({ key: `products-requests/${id}` });
  if (success) setForm(product_request);
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
        atSubmit: () => saveForm(route.params.id),
        atClose: () => scope.stop(),
        atOpen: (id) => {
          products_request = reactive({
            id: id ?? '',
            status: '',
            count: '',
            order_id: route.params.id,
            product_id: '',
            storage_id: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => { products_request = undefined; });
    });
  };

  return {
    render: modalUp,
    atMounted,
    products_request,
  };
}
