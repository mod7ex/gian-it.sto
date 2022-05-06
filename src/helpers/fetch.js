import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const toaster = useToast();
const { apiRequest } = useApi();

const $fetch = async (uri, fallBackErrorMsg, toast = true, config) => {
  const { call, data, errorMsg, success } = apiRequest(uri, config);

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? fallBackErrorMsg);

  return data.value ?? {};
};

// eslint-disable-next-line camelcase
export const $employers = async ({ active, order, department_id, name }, toast) => {
  const { users } = await $fetch('/users', "Couldn't fetch employers !", toast, {
    params: { active, order, department_id, name },
  });

  return users ?? [];
};

export const $employer = async (id, toast) => {
  const { user } = await $fetch(`/users/${id}`, 'Не удалось получить пользователя !', toast);

  return user ?? {};
};

export const $rawPermissions = async (toast) => {
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
