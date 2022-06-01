import { computed, reactive, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $finance } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import departmentStore from '~/store/departments';
import store from '~/store/finances/finances';

const { state: departmentState } = departmentStore;

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const finance = reactive({
  id: undefined,
  name: undefined,
  operation_type: undefined,
  sum: undefined,
  finance_group_id: undefined,
  department_id: departmentState.current,
});

/* ********************* Car marks ********************* */

const isModalUp = ref(false);

const isUpdate = computed(() => !!finance.id);

const { call, data, responce, error, loading, errorMsg, success, reset, ready } = apiRequest();

const setFormField = function (key) {
  if (key.includes('_id')) {
    if (key === 'department_id') return;

    finance[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  finance[key] = this[key] ?? '';
};

const setForm = (payload = {}) => {
  Object.keys(finance).forEach(setFormField, payload);
};

const setModalVisibility = (bool, id) => {
  isModalUp.value = bool ?? false;

  if (bool) reset();

  setForm({ id });
};

const saveForm = async () => {
  reset();

  await call(`/finances/${finance.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: finance,
  });

  if (!success.value) return false;

  await load();

  setModalVisibility(false);

  return toaster.success('финансовая сделка успешно сохранен');
};

const atMountedFinanceForm = async () => {
  const { id } = finance;

  let f = {};
  if (id) f = await $finance(id);

  setForm(f);
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
    setModalVisibility,
    atMountedFinanceForm,
    isUpdate,
    finance,
  };
}
