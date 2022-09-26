import { computed, reactive, effectScope, onScopeDispose, shallowRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import useModalForm from '~/composables/useModalForm';
import RawForm from '~/components/Partials/finances/RawForm.vue';
import communicate from '~/helpers/communicate';
import departmentStore from '~/store/departments';
import formRules from '~/validationsRules/finance';
import store from '~/store/finances/finances';
import useAppRouter from '~/composables/useAppRouter';

const { current } = departmentStore;
const { addFinance } = store;

const toaster = useToast();

let finance;
let v$;

let types;
let typesMapper;
let payment_types;
let isThePage;

const cleanUpForm = () => {
  isThePage = undefined;
  finance = undefined;
  v$ = undefined;
  types = undefined;
  typesMapper = undefined;
  payment_types = undefined;
};

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
  if (id) {
    f = await $.finance(id);
    setForm(f);
  }
};

export default function () {
  const { isThePage: some_boolean } = useAppRouter('OrderEdit');

  if (!isThePage) isThePage = some_boolean;

  const saveForm = async () => {
    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const { message, success, data } = await save.finance(finance);

    try {
      return { message, success };
    } finally {
      if (success) {
        addFinance(data.finance);
        toaster.success(message);
      }
    }
  };

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!finance.id);

      const title = computed(() => {
        if (isUpdate.value) {
          return finance.order_id ? 'Подробности' : communicate.modal.update.finance;
        }
        return communicate.modal.create[isThePage.value ? 'payment' : 'finance'];
      });

      const { render } = useModalForm({
        title,
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id, order_id) => {
          if (!finance) {
            finance = reactive({
              id: id ?? '',
              name: '',
              operation_type: '',
              payment_type: '',
              sum: '',
              finance_group_id: '',
              order_id,
              department_id: current.value,
            });

            v$ = useVuelidate(formRules(isThePage.value), finance, { $lazy: true });
          }
        },
      }, { right: 'Провести' });

      render(...args);

      onScopeDispose(() => {
        finance = undefined;
        v$ = undefined;
      });
    });
  };

  if (!types) {
    typesMapper = shallowRef({});
    types = computed(() => Object.entries(typesMapper.value.operations ?? {}).map(([value, label]) => ({ label, value })));
    payment_types = computed(() => Object.entries(typesMapper.value.payments ?? {}).map(([value, label]) => ({ label, value })));
  }

  return {
    render: modalUp,
    atMountedFinanceForm,
    finance,
    v$,
    current,
    types,
    typesMapper,
    payment_types,
    cleanUpForm,
    isThePage,
    finance_color_map: {
      sell: 'process',
      sellReturn: 'cancel',
      buy: 'wait',
      buyReturn: 'cancel',
    },
  };
}
