import { reactive, effectScope, onScopeDispose, computed } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';
import requestsStore from '~/store/orders/storage-requests';
import departmentStore from '~/store/departments';

const { load, productsRequests, setRequestStatus, state, locallyDropRequest } = requestsStore;
const { current } = departmentStore;

const { sort, fill, reset, set, decreaseCount, locallyDropProduct, products } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
};

let filter;

const ping = async (request, status = 'done') => {
  const { id, product: { id: product_id }, count } = request;
  if (!id) return;
  const wasSet = await setRequestStatus(id, status);
  if (wasSet && product_id && count) {
    decreaseCount(product_id, count);
    // if (productsRequests.value[product_id].length === 0) locallyDropProduct(product_id);
  }
};

export default () => effectScope().run(() => {
  if (!filter) {
    filter = reactive({
      name: '',
      sku: '',
      producer_id: '',
    });
  }

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  const { redirectTo, isThePage, route } = useAppRouter('StorageRequests');

  const fetchProducts = async (bool = false) => {
    if (isThePage.value) return;
    if (bool) reset();
    await fill({ ...filter, storage_id: route.params.id });
  };

  const fetchRequestedParts = async () => {
    if (!isThePage.value) return;
    set(await load({ department_id: current.value, status: 'wait' }));
  };

  const redirectToForm = async (id, product) => {
    if (!id || !product) return;
    await redirectTo({ name: 'EditStorage', params: { product, id } });
  };

  onScopeDispose(() => { filter = undefined; });

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
  };
});
