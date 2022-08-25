import { reactive, effectScope, computed } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';
import requestsStore from '~/store/orders/storage-requests';

const { setRequestStatus, state, replace } = requestsStore;

const { sort, fill, reset, getProducts, state: productsState, dropRequestFromProduct, updateCount } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
};

let filter;
let products;
let target;

const clearMemo = () => {
  filter = undefined;
  products = undefined;
  target = undefined;
};

const ping = async (request, product_id, status = 'done') => {
  const { id, count } = request;

  if (!id || !product_id || !count) return;

  const wasSet = await setRequestStatus(id, status);

  if (!wasSet) return;

  dropRequestFromProduct(id, product_id);

  updateCount(product_id, -count);
};

export default () => effectScope().run(() => {
  const { redirectTo, isThePage, route } = useAppRouter('StorageRequests');

  if (!filter) {
    filter = reactive({
      name: '',
      sku: '',
      producer_id: '',
    });

    products = getProducts(isThePage.value);
    target = computed(() => (productsState.selectedId ? products.value.find(({ id }) => id === productsState.selectedId) ?? {} : {}));
  }

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  const fetchProducts = async (bool = false) => {
    if (bool) reset();
    await fill({ ...filter, storage_id: route.params.id });
  };

  const redirectToForm = async (product, theTarget) => {
    let { id } = route.params;
    if (!id) id = theTarget.storage?.id;
    if (id != null && product != null) await redirectTo({ name: 'EditStorage', params: { product, id } });
  };

  return {
    order,
    filter,
    fetchProducts,
    redirectToForm,
    isThePage,
    ping,
    key: computed(() => state.raw.length),
    replaceInRequests: replace,
    clearMemo,
    products,
    target,
    selected: computed(() => !!target?.value?.id),
  };
});
