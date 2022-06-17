import useApi from '~/composables/useApi.js';
import { cleanUp, extract } from '~/helpers';
import communicate from '~/helpers/communicate';
import useToast from '~/composables/useToast.js';

const toaster = useToast();

const { apiRequest } = useApi();

export const save = async function (path, Id) {
  // path is without 's'
  const { call, errorMsg, success, data } = apiRequest();

  /*
  *
  * in case of updating we can passe id either in data or as a stand alone argument
  *
  */

  const id = this?.id ?? Id;

  await call(`/${path}/${id ?? ''}`, {
    method: id ? 'put' : 'post',
    data: cleanUp(this, 'id'),
  });

  return { message: errorMsg.value, success: success.value, data: data.value };
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
