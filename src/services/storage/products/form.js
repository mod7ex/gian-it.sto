import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import validation from '~/validationsRules/product';
import useAppRouter from '~/composables/useAppRouter.js';
import useAvatar from '~/composables/useAvatar.js';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import store from '~/store/storage/products';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAuth from '~/composables/useAuth';

const { select, drop: removeProduct } = store;
const { user } = useAuth();

let routeInstance;
let isEditProductPage;
let redirectBack;

const previousPage = async (id) => {
  if (id) select(id);
  await redirectBack();
};

const { avatar, isUploadingAvatar, isValideAvatarFileSize, log, setAvatar, updateAvatar, defaults } = useAvatar();

const product = reactive({
  id: '',
  name: '',
  place: '',
  count: '',
  input_sum: '',
  output_sum: '',
  description: '',
  sku: '',
  producer_id: '',
  storage_id: '',
  user_id: '',
});

/* ************ Product form ************ */
const { rules } = validation();

const v$ = useVuelidate(rules, product, { $lazy: true });

const saveProduct = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm &&= isValideAvatarFileSize.value;

  if (!isValideForm) return;

  v$.value.$reset();

  // eslint-disable-next-line prefer-const
  let { data, success } = await save.product(product, null, true);

  if (!success) return;

  // ********* Photo request
  success = await updateAvatar(`/products/${data?.product?.id}/photo`, 'photo');

  if (success) await previousPage(data?.product?.id);
};

const setField = function (key) {
  if (key.includes('_id')) {
    if (key === 'storage_id') {
      product.storage_id = routeInstance.params.id;
      return;
    }

    if (key === 'user_id') {
      product.user_id = user.value.id;
      return;
    }

    product[key] = this[key.replace('_id', '')]?.id ?? '';
    return;
  }

  product[key] = this[key] ?? '';
};

const setFields = async (payload) => {
  setAvatar(payload, 'photo');

  Object.keys(product).forEach(setField, payload);
};

const atMountedProductForm = async () => {
  const payload = (isEditProductPage.value && routeInstance.params.product) && await $.product(routeInstance.params.product);

  await setFields(payload || {});
};

export default function () {
  const { route, isThePage, back } = useAppRouter('EditStorage');

  [routeInstance, isEditProductPage, redirectBack] = [route, isThePage, back];

  const { drop } = useConfirmDialog();

  const dropProduct = (id = route.params.product) => drop(async () => {
    const { success, message } = await removeProduct(id);
    success && isThePage.value && back();
    return { success, message };
  });

  return {
    isValideAvatarFileSize,
    log,
    avatar,
    product,
    isEditProductPage,
    v$,
    saveProduct,
    atMountedProductForm,
    isUploadingAvatar,
    previousPage,
    dropProduct,
    defaults,
  };
}
