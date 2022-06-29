import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '~/components/Partials/finances/groups/RawForm.vue';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/finances/groups';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';

const { load } = store;

const toaster = useToast();

let financeGroup;

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

  if (id) {
    const fg = await $.finance_group(id);
    setForm(fg);
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!financeGroup.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].finance_group),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          financeGroup = reactive({
            id: id ?? '',
            name: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => {
        financeGroup = undefined;
      });
    });
  };

  return {
    render: modalUp,
    financeGroup,
    atMountedFinanceGroup,
  };
}
