import { computed, reactive } from 'vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import departmentStore from '~/store/departments';
import store from '~/store/finances/finances';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/finances/RawForm.vue';
import communicate from '~/helpers/communicate';

const { state: departmentState } = departmentStore;

const { load } = store;

const toaster = useToast();

const finance = reactive({
  id: undefined,
  name: undefined,
  operation_type: undefined,
  sum: undefined,
  finance_group_id: undefined,
  department_id: departmentState.current,
});

/* ********************* Car marks ********************* */

const isUpdate = computed(() => !!finance.id);

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

const saveForm = async () => {
  const { message, success } = await save.finance(finance);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success(message);
    }
  }
};

const atMountedFinanceForm = async () => {
  const { id } = finance;

  let f = {};
  if (id) f = await $.finance(id);

  setForm(f);
};

export default function () {
  const { render } = useModalForm({
    title: communicate.modal[isUpdate.value ? 'update' : 'create'].finance,
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    render,
    atMountedFinanceForm,
    finance,
  };
}
