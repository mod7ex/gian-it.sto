import { reactive } from 'vue';
import useOrder from '~/composables/useOrder.js';
import store from '~/store/storage/products';
import useAppRouter from '~/composables/useAppRouter';

const { sort, fill, reset, locate } = store;

const DEFAULT_ORDER_CRITERIA = 'id';

const pivot = {
  id: { label: 'По умолчанию', sort: (a, b) => (a.id - b.id) },
  name: { label: 'По имени', sort: (a, b) => (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) },
};

const filter = reactive({
  name: '',
  sku: '',
  producer_id: '',
});

const order = useOrder(pivot, DEFAULT_ORDER_CRITERIA, (v) => { sort(v); }, 1);

const { trigger } = order;

export default function () {
  const { route, redirectTo } = useAppRouter();

  const fetchProducts = async (bool = false) => {
    if (bool) {
      reset();
      await locate(route.params.id);
    }
    await fill(filter);
    trigger();
  };

  const redirectToForm = async (id) => {
    if (!id) return;
    await redirectTo({ name: 'EditStorage', params: { product: id } });
  };

  return {
    order,
    filter,
    fetchProducts,
    redirectToForm,
  };
}
