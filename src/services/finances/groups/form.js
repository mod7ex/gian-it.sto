import { computed, reactive } from 'vue';
import RawForm from '~/components/Partials/finances/groups/RawForm.vue';
import useApi from '~/composables/useApi.js';
import { $financeGroup } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/finances/groups';
import useModalForm from '~/composables/useModalForm';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const financeGroup = reactive({
  id: '',
  name: '',
});

const isUpdate = computed(() => !!financeGroup.id);

const setForm = (payload) => {
  financeGroup.id = payload?.id;
  financeGroup.name = payload?.name;
};

const saveForm = async () => {
  const { call, errorMsg, success } = apiRequest();

  await call(`/finance-groups/${financeGroup.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: financeGroup,
  });

  try {
    return { message: errorMsg.value, success: success.value };
  } finally {
    if (success.value) {
      await load();
      toaster.success('финансовая группа успешно сохранен');
    }
  }
};

const atMountedFinanceGroup = async () => {
  const { id } = financeGroup;

  let fg = {};
  if (id) fg = await $financeGroup(id);

  setForm(fg);
};

export default function () {
  const { render } = useModalForm({
    title: `${isUpdate.value ? 'Oбновляете' : 'Создайте'} финансовая группа`,
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    render,
    financeGroup,
    atMountedFinanceGroup,
  };
}
