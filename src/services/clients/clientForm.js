import { onScopeDispose, reactive, effectScope, computed, h } from 'vue';
import useVuelidate from '@vuelidate/core';
import clientFormValidationsRules from '~/validationsRules/clientForm';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import departmentStore from '~/store/departments';
import save from '~/helpers/save';
import useModalForm from '~/composables/useModalForm';
import communicate from '~/helpers/communicate';
import service from '~/services/clients/clients';
import RawForm from '~/components/Partials/clients/ClientFormFields.vue';

const { current, setCurrent } = departmentStore;

let routeInstance;
let isEditClientPage;
let redirectBack;
let modalUp;
let v$;

const defaultClientFields = {
  id: '',
  name: '',
  surname: '',
  middle_name: '',
  gender: '',
  address: '',
  passport: '',
  notes: '',
  born_at: '',
  phones: [''],
  emails: [''],
  department_id: '',
  cars: [],
};

let clientFields;

/* ************ client form ************ */

const saveClient = async (inModal) => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { data, success, message } = await save.client(clientFields, null, true);

  if (inModal) {
    const { fetchClients } = service();
    try {
      return { message, success };
    } finally {
      if (success) {
        await fetchClients(true);
      }
    }
  } else {
    if (!success) return;

    if (data?.client?.department?.id) setCurrent(data?.client?.department?.id);

    redirectBack();

    return success;
  }
};

const setClientField = function (key) {
  if (key === 'department_id') {
    // if (!hasCRUDdepartments) clientFields.department_id = userDepartment.value; // not needed
    clientFields.department_id = this.department?.id ?? current.value;
    return;
  }

  if (Array.isArray(defaultClientFields[key])) {
    if (key !== 'cars') {
      if (Array.isArray(this[key]) && this[key].length) {
        clientFields[key] = this[key];
        return;
      }
      clientFields[key] = [''];
      return;
    }

    clientFields[key] = this[key] ?? [];
    return;
  }

  clientFields[key] = this[key] ?? '';
};

const setForm = async (payload) => {
  Object.keys(clientFields).forEach(setClientField, payload);

  if (!clientFields.born_at) return;

  clientFields.born_at = hyphenatedDateFormat(clientFields.born_at);
};

const atMountedClientForm = async (inModal) => {
  if (inModal) return;

  let client = {};

  if (isEditClientPage.value && routeInstance.params.id) {
    client = await $.client(routeInstance.params.id);
  }

  await setForm(client || {});
};

const addItem = (item) => () => {
  if (Array.isArray(clientFields[item]) && clientFields[item].length) {
    Reflect.deleteProperty(clientFields[item], 'active');
    clientFields[item] = clientFields[item].filter((el) => !!el);
    if (!clientFields[item].length) {
      clientFields[item] = [''];
      return;
    }
    v$.value[item].$touch();
    if (v$.value[item].$error) return;
    clientFields[item].push('');
    v$.value[item].$reset();
    return;
  }
  clientFields[item] = [''];
};

const clearMemo = () => onScopeDispose(() => {
  clientFields = undefined;
  routeInstance = undefined;
  isEditClientPage = undefined;
  redirectBack = undefined;
  modalUp = undefined;
  v$ = undefined;
});

const prepare = (inModal) => {
  if (clientFields) return;

  clientFields = reactive(defaultClientFields);

  clientFields.department_id = current.value;

  const { route, isThePage, back } = useAppRouter('EditClient');

  [routeInstance, isEditClientPage, redirectBack] = [route, isThePage, back];

  const rules = clientFormValidationsRules(inModal);

  v$ = useVuelidate(rules, clientFields, { $lazy: true });
};

export default function (inModal) {
  if (!inModal) {
    prepare(false);
    clearMemo();
  } else {
    modalUp = (...args) => {
      const scope = effectScope();

      scope.run(() => {
        const isUpdate = computed(() => !!clientFields.id);

        const { render } = useModalForm({
          title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].client),
          RawForm: h(RawForm, { inModal: true }),
          atSubmit: () => saveClient(true),
          atClose: () => scope.stop(),
          atOpen: () => prepare(true),
        });

        render(...args);

        clearMemo();
      });
    };
  }

  return {
    clientFields,
    modalUp,
    isEditClientPage,
    v$,
    saveClient: () => saveClient(false),
    atMountedClientForm,
    addItem,
    redirectBack,
  };
}
