import useApi from '~/composables/useApi.js';
import communicate from '~/helpers/communicate';
import { keyToPath } from '~/helpers';

const { apiRequest } = useApi();

const drop = async function () {
  const { call, errorMsg, success, data } = apiRequest(`${this.path}/${this.id}`, { method: 'delete' });

  await call();

  return { message: errorMsg.value, success: success.value, data: data.value };
};

export default new Proxy(drop, {
  get(target, key) {
    // the call should be as follow ==> proxy.client(id)
    const path = keyToPath(key);

    return async function (id, onSuccess) {
      // eslint-disable-next-line prefer-const
      let { success, message, data } = await target.call({ path, id });

      if (success) {
        await onSuccess(id);
        message = communicate.drop.success[key];
      } else {
        message = message ?? communicate.drop.error[key];
      }

      return { message, success, data };
    };
  },

  apply(target, thisArg, args) { // doesn't return the success message
    // proxy({id, path}) // path with 's'

    return target.call(args[0]);
  },
});
