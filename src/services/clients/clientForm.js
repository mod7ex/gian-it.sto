import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import clientFormValidationsRules from '~/validationsRules/clientForm';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import { $client } from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import useAuth from '~/composables/useAuth.js';
import { userHasPermission } from '~/lib/permissions.js';
import departmentStore from '~/store/departments';
import store from '~/store/clients';

const { select } = store;

const { current, setCurrent } = departmentStore;

const { apiRequest } = useApi();
const toaster = useToast();
const { userDepartment } = useAuth();
const hasCRUDdepartments = userHasPermission('crud departments');

let routeInstance;
let isEditClientPage;
let redirectBack;
let v$;

const previousPage = async (id) => {
  if (id) select(id);
  await redirectBack();
};

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

const clientFields = reactive(defaultClientFields);

/* ************ client form ************ */
const saveRawClientFields = async () => {
  const { call, data, errorMsg, success } = apiRequest(`/clients/${isEditClientPage.value ? routeInstance.params.id : ''}`, {
    method: isEditClientPage.value ? 'put' : 'post',
    data: clientFields,
  });

  await call();

  if (success.value) toaster.success('Данные клиента успешно сохранены');
  else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, Не удалось сохранить данные клиента !');

  return data.value?.client;
};

const saveClient = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const client = await saveRawClientFields();

  if (!client?.id) return;

  if (client?.department?.id) setCurrent(client?.department?.id);

  await previousPage(client?.id);

  return !!client?.id;
};

const setClientField = function (key) {
  if (key === 'department_id') {
    if (!hasCRUDdepartments) clientFields.department_id = userDepartment.value;
    clientFields.department_id = this.department?.id ?? current.value;
    // i the think first if statement is not needed
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

const setClientForm = async (payload) => {
  Object.keys(clientFields).forEach(setClientField, payload);

  if (!clientFields.born_at) return;

  clientFields.born_at = hyphenatedDateFormat(clientFields.born_at);
};

const atMountedClientForm = async () => {
  const client = (isEditClientPage.value && routeInstance.params.id) && await $client(routeInstance.params.id);

  await setClientForm(client || {});
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
  const { route, isThePage, back } = useAppRouter('EditClient');

  [routeInstance, isEditClientPage, redirectBack] = [route, isThePage, back];

  const rules = clientFormValidationsRules();

  v$ = useVuelidate(rules, clientFields, { $lazy: true });

  return {
    clientFields,
    isEditClientPage,
    v$,
    saveClient,
    atMountedClientForm,
    previousPage,
    addItem,
  };
}
