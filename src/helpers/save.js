import useApi from '~/composables/useApi.js';

const { apiRequest } = useApi();

export const save = async ({ data, path, id }) => {
  const { call, errorMsg, success } = apiRequest();

  const isUpdate = !!id;

  await call(`/${path}/${id ?? ''}`, {
    method: isUpdate ? 'put' : 'post',
    data,
  });

  return { message: errorMsg.value, success: success.value };
};

export const NOOP = () => {};

// proxy
