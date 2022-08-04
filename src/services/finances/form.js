import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/finances/RawForm.vue';
import communicate from '~/helpers/communicate';
import service from '~/services/finances/index';
import departmentStore from '~/store/departments';
import formRules from '~/validationsRules/finance';

const { current } = departmentStore;

const toaster = useToast();

let finance;
let v$;

const setFormField = function (key) {
  if (key.includes('_id')) {
    if (key === 'department_id') {
      // we might wanna make it optional if the user doesn't have crud departments
      finance.department_id = this.department?.id ?? current.value;
      return;
    }

    finance[key] = this[key.replace('_id', '')]?.id;
    return;
  }

  finance[key] = this[key] ?? '';
};

const setForm = (payload = {}) => { Object.keys(finance).forEach(setFormField, payload); };

const atMountedFinanceForm = async () => {
  const { id } = finance;

  let f = {};
  if (id) f = await $.finance(id);

  setForm(f);
};

export default function () {
  const { fetchFinances } = service();

  const saveForm = async () => {
    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const { message, success } = await save.finance(finance);

    try {
      return { message, success };
    } finally {
      if (success) {
        await fetchFinances(true);
        toaster.success(message);
      }
    }
  };

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!finance.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].finance),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          finance = reactive({
            id: id ?? '',
            name: '',
            operation_type: '',
            sum: '',
            finance_group_id: '',
            order_id: '',
            department_id: current.value,
          });

          v$ = useVuelidate(formRules(), finance, { $lazy: true });
        },
      });

      render(...args);

      onScopeDispose(() => {
        finance = undefined;
        v$ = undefined;
      });
    });
  };

  return {
    render: modalUp,
    atMountedFinanceForm,
    finance,
    v$,
    current,
  };
}
