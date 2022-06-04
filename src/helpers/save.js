import useApi from '~/composables/useApi.js';
import { cleanUp, keyToPath } from '~/helpers';
import communicate from '~/helpers/communicate.json';

const { apiRequest } = useApi();

export const save = async function (path, Id, fallBackErr) {
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

  return { message: errorMsg.value ?? fallBackErr, success: success.value, data: data.value };
};

export default new Proxy(save, {
  get(target, key) {
    const fallBackErr = communicate.fetch.error[key] ?? communicate.fetch.error._;
    // the call should be as follow ==> proxy.client(data), data first then id
    const path = keyToPath(key);
    return function (data, id) {
      return target.call(data, path, id, fallBackErr);
      // return target.call(arguments[0], path, arguments[1]); // issue with eslint
    };
  },

  apply(target, thisArg, args) {
    // proxy({data, id, path}) // path with 's'
    const { data, path, id } = args[0];

    return target.call(data, path, id);
  },
});
