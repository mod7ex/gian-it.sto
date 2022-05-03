import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const toaster = useToast();
const { apiRequest } = useApi();

// eslint-disable-next-line camelcase
export const $employers = async ({ active, order, department_id, name }, toast = true) => {
  const { call, data, errorMsg, success } = apiRequest('/users', {
    params: { active, order, department_id, name },
  });

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? "Couldn't fetch employers !");

  return data.value?.users ?? [];
};

export const $employer = async (id, toast = true) => {
  const { call, data, errorMsg, success } = apiRequest(`/users/${id}`);

  await call();

  toast && !success.value && toaster.success(errorMsg.value ?? 'Не удалось получить пользователя');

  return data.value?.user ?? {};
};

export const $rawPermissions = async (toast = true) => {
  const { call, data, errorMsg, success } = apiRequest('/permissions');

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить разрешения');

  return data.value?.permissions ?? [];
};

export const $role = async (id, toast = true) => {
  const { call, data, errorMsg, success } = apiRequest(`/roles/${id}`);

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить роль');

  return data.value?.role ?? {};
};

export const $departments = async (toast = true) => {
  const { call, data, errorMsg, success } = apiRequest('/departments');

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить отделы');

  return data.value?.departments ?? [];
};

export const $roles = async (toast = true) => {
  const { call, data, errorMsg, success } = apiRequest('/roles');

  await call();

  toast && !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить роли');

  return data.value?.roles ?? [];
};
