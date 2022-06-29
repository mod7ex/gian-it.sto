import { onScopeDispose, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import clientFormValidationsRules from '~/validationsRules/clientForm';
import useAppRouter from '~/composables/useAppRouter.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import departmentStore from '~/store/departments';
import save from '~/helpers/save';

const { current, setCurrent } = departmentStore;

let routeInstance;
let isEditClientPage;
let redirectBack;
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
  city_id: '',
  department_id: '',
  cars: [],
};

let clientFields;

/* ************ client form ************ */

const saveClient = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const { data, success } = await save.client(clientFields, null, true);

  if (!success) return;

  if (data?.client?.department?.id) setCurrent(data?.client?.department?.id);

  await redirectBack();

  return success;
};

const setClientField = function (key) {
  if (key === 'department_id') {
    // if (!hasCRUDdepartments) clientFields.department_id = userDepartment.value; // not needed
    clientFields.department_id = this.department?.id ?? current.value;
    return;
  }

  if (key === 'city_id') {
    clientFields.city_id = this.city?.id;
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

const atMountedClientForm = async () => {
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

export default function () {
  if (!clientFields) {
    clientFields = reactive(defaultClientFields);
  }

  const { route, isThePage, back } = useAppRouter('EditClient');

  [routeInstance, isEditClientPage, redirectBack] = [route, isThePage, back];

  const rules = clientFormValidationsRules();

  v$ = useVuelidate(rules, clientFields, { $lazy: true });

  onScopeDispose(() => {
    clientFields = undefined;
    routeInstance = undefined;
    isEditClientPage = undefined;
    redirectBack = undefined;
    v$ = undefined;
  });

  return {
    clientFields,
    isEditClientPage,
    v$,
    saveClient,
    atMountedClientForm,
    addItem,
    redirectBack,
  };
}
