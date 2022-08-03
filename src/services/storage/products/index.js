import { reactive, effectScope, computed } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';
import departmentStore from '~/store/departments';
import requestsStore from '~/store/orders/storage-requests';

const { load, productsRequests, setRequestStatus, state, products: requestedProducts, locallyDropRequest, replace, updateCount } = requestsStore;
const { current } = departmentStore;

const { sort, fill, reset, products: rawProducts, select } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
};

let filter;

const clearMemo = () => {
  filter = undefined;
};

const ping = async (request, status = 'done') => {
  const { id, product: { id: product_id }, count } = request;
  if (!id) return;
  const wasSet = await setRequestStatus(id, status);
  if (wasSet && product_id && count) {
    locallyDropRequest(id);
    if (productsRequests.value[product_id]) {
      updateCount(product_id, count);
      return;
    }
    select();
  }
};

export default () => effectScope().run(() => {
  const { redirectTo, isThePage, route } = useAppRouter('StorageRequests');

  if (!filter) {
    filter = reactive({
      name: '',
      sku: '',
      producer_id: '',
    });
  }

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  const fetchProducts = async (bool = false) => {
    if (isThePage.value) return;
    if (bool) reset();
    await fill({ ...filter, storage_id: route.params.id });
  };

  const fetchRequestedParts = async () => {
    if (!isThePage.value) return;
    await load({ department_id: current.value, status: 'wait' });
  };

  const redirectToForm = async (id, product) => {
    if (!id || !product) return;
    await redirectTo({ name: 'EditStorage', params: { product, id } });
  };

  return {
    order,
    filter,
    fetchProducts,
    redirectToForm,
    fetchRequestedParts,
    isThePage,
    productsRequests,
    ping,
    key: computed(() => state.raw.length),
    replaceInRequests: replace,
    requestedProducts,
    rawProducts,
    clearMemo,
    products: isThePage.value ? requestedProducts : rawProducts,
  };
});
