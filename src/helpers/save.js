import useApi from '~/composables/useApi.js';
import { cleanUp, extract } from '~/helpers';
import communicate from '~/helpers/communicate';
import useToast from '~/composables/useToast.js';

const toaster = useToast();

const { apiRequest } = useApi();

export const upload = async function (path, files) {
  const { call, errorMsg, success, data } = apiRequest();

  await call(path, {
    method: 'post',
    data: files,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // message is error message
  return { message: errorMsg.value, success: success.value, data: data.value };
};

export const rootSave = async (path, payload, method) => {
  // path is without 's'
  const { call, errorMsg, success, data } = apiRequest();

  /*
    *
    * in case of updating we can passe id either in data or as a stand alone argument
    *
    */

  await call(path, { method, data: payload });

  return { message: errorMsg.value, success: success.value, data: data.value };
};

export const save = async function (path, Id) {
  const id = this?.id ?? Id;

  return rootSave(`/${path}/${id ?? ''}`, cleanUp(this, 'id'), id ? 'put' : 'post');
};

export default new Proxy(save, {
  get(target, key) {
    // the call should be as follow ==> proxy.client(data), data first then id
    const { path, ressource } = extract(key);
    return async function (_data, id, toast = false) {
      // eslint-disable-next-line prefer-const
      let { success, message, data } = await target.call(_data, path, id);

      if (success) {
        message = communicate.save.success[ressource];
      } else {
        message = message ?? communicate.save.error[ressource];
      }

      try {
        return { message, success, data };
      } finally {
        if (toast) toaster[success ? 'success' : 'danger'](message);
      }
    };
  },

  apply(target, thisArg, args) { // doesn't return the success message
    // proxy({data, id, path}) // path with 's'
    const { data, path, id } = args[0];

    return target.call(data, path, id);
  },
});
