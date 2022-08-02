import { reactive, effectScope, onScopeDispose, computed } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';
import requestsStore from '~/store/orders/storage-requests';
import departmentStore from '~/store/departments';

const { load, productsRequests, setRequestStatus: ping, state } = requestsStore;
const { current } = departmentStore;

const { sort, fill, reset, set } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
};

let filter;

export default () => effectScope().run(() => {
  if (!filter) {
    filter = reactive({
      name: '',
      sku: '',
      producer_id: '',
    });
  }

  const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

  const { redirectTo, isThePage } = useAppRouter('StorageRequests');

  const fetchProducts = async (bool = false) => {
    if (isThePage.value) return;
    if (bool) reset();
    await fill(filter);
  };

  const fetchRequestedParts = async () => {
    if (isThePage.value) {
      await load({ department_id: current.value });
      // eslint-disable-next-line no-unused-vars
      set(Object.entries(productsRequests.value).map(([_, [{ product }]]) => product));
    }
  };

  const redirectToForm = async (id) => {
    if (!id) return;
    await redirectTo({ name: 'EditStorage', params: { product: id } });
  };

  onScopeDispose(() => {
    filter = undefined;
  });

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
