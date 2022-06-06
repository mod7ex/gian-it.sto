import { computed, reactive } from 'vue';
import RawForm from '~/components/Partials/finances/groups/RawForm.vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/finances/groups';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';

const { load } = store;

const toaster = useToast();

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
  const { message, success } = await save.finance_group(financeGroup);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedFinanceGroup = async () => {
  const { id } = financeGroup;

  let fg = {};
  if (id) fg = await $.finance_group(id);

  setForm(fg);
};

export default function () {
  const { render } = useModalForm({
    title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].finance_group),
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
