import { computed, effectScope, onScopeDispose, reactive } from 'vue';
import RawForm from '~/components/Partials/storage/products/AssignRequest.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import store from '~/store/storage/products';

const { addProductRequest } = store;

const toaster = useToast();

let products_request;

const saveForm = async () => {
  const { message, success, data } = await save.products_request(products_request);

  try {
    return { message, success };
  } finally {
    if (success) {
      toaster.success(message);
      if (data?.product_request && data?.product_request?.status === 'wait') {
        const { product_request } = data;
        const { product } = product_request;
        delete product_request.product;
        addProductRequest(product?.id, product_request);
      }
    }
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!products_request.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].products_request),
        RawForm,
        atSubmit: () => saveForm(),
        atClose: () => scope.stop(),
        atOpen: (id) => {
          products_request = reactive({
            status: '',
            count: '',
            order_id: '',
            product_id: id,
          });
        },
      });

      render(...args);

      onScopeDispose(() => { products_request = undefined; });
    });
  };

  return {
    render: modalUp,
    products_request,
  };
}
