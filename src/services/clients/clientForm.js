import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import clientFormValidationsRules from '~/validationsRules/clientForm';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import clients from '~/services/clients/clients';
import { $departments, $client, $cities } from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import useAuth from '~/composables/useAuth.js';
import { userHasPermission } from '~/lib/permissions.js';

const { apiRequest } = useApi();
const toaster = useToast();
const { userDepartment } = useAuth();
const { setSelectedClient } = clients();
const hasCRUDdepartments = userHasPermission('crud departments');

let routeInstance;
let isEditClientPage;
let redirectBack;
let v$;

const previousPage = async (id) => {
  if (id) setSelectedClient(id);
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

/* ************ Departments & Cities ************ */
const rawDepartments = ref([]);
const rawCities = ref([]);

const departmentOptions = computed(() => rawDepartments.value.map((department) => ({
  value: department.id,
  label: department.name,
})));

const cityOptions = computed(() => rawCities.value.map((city) => ({
  value: city.id,
  label: city.name,
})));

/* ************ client form ************ */
const saveRawClientFields = async () => {
  const { call, data, errorMsg, success } = apiRequest(`/clients/${isEditClientPage.value ? routeInstance.params.id : ''}`, {
    method: isEditClientPage.value ? 'put' : 'post',
    data: clientFields,
  });

  await call();

  if (success.value) toaster.success('Данные клиента успешно сохранены');
  else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, Не удалось сохранить данные клиента !');

  return data.value?.client?.id;
};

const saveClient = async () => {
  const isValideForm = await v$.value.$validate();

  if (!isValideForm) return;

  v$.value.$reset();

  const clientId = await saveRawClientFields();

  if (!clientId) return;

  await previousPage(clientId);

  return !!clientId;
};

const setClientField = function (key) {
  if (key === 'department_id') {
    clientFields.department_id = hasCRUDdepartments ? (this.department?.id ?? '') : userDepartment.value;
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

  rawCities.value = await $cities();
  if (hasCRUDdepartments) rawDepartments.value = await $departments();
};

const addItem = (item) => () => {
  console.log(clientFields.cars);
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

export default function clientFormService() {
  const { route, isThePage, back } = useAppRouter('EditClient');

  [routeInstance, isEditClientPage, redirectBack] = [route, isThePage, back];

  const rules = clientFormValidationsRules();

  v$ = useVuelidate(rules, clientFields, { $lazy: true });

  return {
    departmentOptions,
    clientFields,
    isEditClientPage,
    v$,
    saveClient,
    setClientForm,
    atMountedClientForm,
    previousPage,
    cityOptions,
    addItem,
  };
}
