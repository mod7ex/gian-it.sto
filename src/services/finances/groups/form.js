import { computed, ref, reactive } from 'vue';
import useApi from '~/composables/useApi.js';
import { $financeGroup } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/finances/groups';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const financeGroup = reactive({
  id: '',
  name: '',
});

const isModalUp = ref(false);

const isUpdate = computed(() => !!financeGroup.id);

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest();

const setForm = (payload) => {
  financeGroup.id = payload?.id;
  financeGroup.name = payload?.name;
};

const setModalVisibility = (bool, id) => {
  isModalUp.value = bool ?? false;

  if (bool) reset();

  setForm({ id });
};

const saveForm = async () => {
  reset();

  await call(`/finance-groups/${financeGroup.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: financeGroup,
  });

  if (!success.value) return false;

  await load();

  setModalVisibility(false);

  return toaster.success('финансовая группа успешно сохранен');
};

const atMountedFinanceGroup = async () => {
  const { id } = financeGroup;

  let fg = {};
  if (id) fg = await $financeGroup(id);

  setForm(fg);
};

export default function () {
  return {
    data,
    saveForm,
    responce,
    error,
    loading,
    errorMsg,
    success,
    ready,
    isModalUp,
    financeGroup,
    setModalVisibility,
    atMountedFinanceGroup,
    isUpdate,
  };
}
