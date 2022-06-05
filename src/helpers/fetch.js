import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import { cleanUp, keyToPath } from '~/helpers';
import communicate from '~/helpers/communicate';

const toaster = useToast();
const { apiRequest } = useApi();

const $fetch = async (uri, fallBackErrorMsg, toast = true, config) => {
  const { call, data, errorMsg, success } = apiRequest(uri, config);

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? fallBackErrorMsg);

  return data.value ?? {};
};

// ****************************************************** use Proxy to generate the right request dynamically

export default new Proxy($fetch, {
  get(target, key) {
    /* Ex
     *
     * proxy.client(id, toast)
     * proxy.clients(params = {}, toast)
     *
     */
    const path = keyToPath(key);

    const isPlural = key[key.length - 1] === 's';

    const fallBackErr = communicate.fetch.error[key];

    if (isPlural) {
      return async function (params = {}, toast = true) {
        const responce = await target.call({}, path, fallBackErr, toast, { params: cleanUp(params) });

        return Reflect.get(responce, key) ?? [];
      };
    }

    return async function (id, toast = true) {
      const responce = await target.call({}, `/${path}/${id}`, fallBackErr, toast);

      return Reflect.get(responce, key) ?? {};
    };
  },

  apply(target, thisArg, args) {
    // proxy({ toast, config, key }) // path with 's'
    const { toast, params, key } = args[0];

    const fallBackErr = communicate.fetch.error[key];
    const path = keyToPath(key);

    return target.call({}, path, fallBackErr, toast, { params: cleanUp(params) });
  },
});

// **********************************************************************************************************

/*
export const $employers = async ({ active, order, department_id, name } = {}, toast) => {
  const { users } = await $fetch('/users', 'Не удалось получить работодателей. !', toast, {
    params: cleanUp({ active, order, department_id, name }),
  });

  return users ?? [];
};

export const $employer = async (id, toast) => {
  const { user } = await $fetch(`/users/${id}`, 'Не удалось получить пользователя !', toast);

  return user ?? {};
};

export const $permissions = async (toast) => {
  const { permissions } = await $fetch('/permissions', 'Не удалось получить разрешения !', toast);

  return permissions ?? [];
};

export const $role = async (id, toast) => {
  const { role } = await $fetch(`/roles/${id}`, 'Не удалось получить роль !', toast);

  return role ?? {};
};

export const $departments = async (toast) => {
  const { departments } = await $fetch('/departments', 'Не удалось получить отделы !', toast);

  return departments ?? [];
};

export const $roles = async (toast) => {
  const { roles } = await $fetch('/roles', 'Не удалось получить роли !', toast);

  return roles ?? [];
};

export const $cities = async (toast) => {
  const { cities } = await $fetch('/cities', 'Не удалось получить города !', toast);

  return cities ?? [];
};

export const $department = async (id, toast) => {
  const { department } = await $fetch(`/departments/${id}`, 'Не удалось получить отделение !', toast);

  return department ?? {};
};

export const $clients = async ({ order, department_id, city_id, name, search, number } = {}, toast = false) => {
  const { clients } = await $fetch('/clients', 'Не удалось получить клиентов !', toast, {
    params: cleanUp({ order, department_id, city_id, name, search, number }),
  });

  return clients ?? [];
};

export const $client = async (id, toast) => {
  const { client } = await $fetch(`/clients/${id}`, 'Не удалось получить клиент !', toast);

  return client ?? {};
};

export const $cars = async ({ client_id, car_model_id }, toast) => {
  const { cars } = await $fetch('/cars', 'Не удалось получить aвтомобили !', toast, {
    params: cleanUp({ client_id, car_model_id }),
  });

  return cars ?? [];
};

export const $car = async (id, toast) => {
  const { car } = await $fetch(`/cars/${id}`, 'Не удалось получить автомобиль !', toast);

  return car ?? {};
};

export const $carMarks = async (toast) => {
  const { car_marks } = await $fetch('/car-marks', 'Не удалось получить Марки автомобиля !', toast);

  return car_marks ?? [];
};

export const $carMark = async (id, toast) => {
  const { car_mark } = await $fetch(`/car-marks/${id}`, 'Не удалось получить Марка автомобиля !', toast);

  return car_mark ?? {};
};

export const $carModels = async ({ car_mark_id } = {}, toast) => {
  const { car_models } = await $fetch('/car-models', 'Не удалось получить модели автомобиля !', toast, {
    params: cleanUp({ car_mark_id }),
  });

  return car_models ?? [];
};

export const $carModel = async (id, toast) => {
  const { car_model } = await $fetch(`/car-models/${id}`, 'Не удалось получить модель автомобиля !', toast);

  return car_model ?? {};
};

export const $carEngines = async (toast) => {
  const { engine_volumes } = await $fetch('/engine-volumes', 'Не удалось получить объем двигателя автомобиля !', toast);

  return engine_volumes ?? [];
};

export const $carFuels = async (toast) => {
  const { fuels } = await $fetch('/fuels', 'Не удалось получить объем видов топлива !', toast);

  return fuels ?? [];
};

export const $financeGroups = async (toast) => {
  const { finance_groups } = await $fetch('/finance-groups', 'Не удалось получить cписок финансовые группы !', toast);

  return finance_groups ?? [];
};

export const $financeGroup = async (id, toast) => {
  const { finance_group } = await $fetch(`/finance-groups/${id}`, 'Не удалось получить финансовых групп !', toast);

  return finance_group ?? {};
};

export const $finances = async ({ order, name, type, sum, department_id, start_date, end_date } = {}, toast = false) => {
  const { finances } = await $fetch('/finances', 'Не удалось получить финансы !', toast, {
    params: cleanUp({ order, name, type, sum, department_id, start_date, end_date }),
  });

  return finances ?? [];
};

export const $finance = async (id, toast) => {
  const { finance } = await $fetch(`/finances/${id}`, 'Не удалось получить финансовая сделка !', toast);

  return finance ?? {};
};
*/
