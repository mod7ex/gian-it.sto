import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import { cleanUp, extract, isPlural } from '~/helpers';
import communicate from '~/helpers/communicate';

const toaster = useToast();
const { apiRequest } = useApi();

export const $fetch = async (uri, fallBackErrorMsg, toast = true, config) => {
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
    let { path, ressource } = extract(key);

    if (ressource === 'products_requests') ressource = 'product_requests'; // Fix --> Server side fix

    const fallBackErr = communicate.fetch.error[ressource];

    if (isPlural(key)) {
      return async function (params = {}, toast = true) {
        const responce = await target.call({}, path, fallBackErr, toast, { params: cleanUp(params) });

        return Reflect.get(responce, ressource) ?? [];
      };
    }

    return async function (id, toast = true) {
      const responce = await target.call({}, `/${path}/${id}`, fallBackErr, toast);

      return Reflect.get(responce, ressource) ?? {};
    };
  },

  apply(target, thisArg, args) {
    // proxy({ toast, config, key }) // path with 's'
    const { toast, params, key } = args[0];

    let { path, ressource } = extract(key);
    const fallBackErr = communicate.fetch.error[ressource];

    if (key === 'tasks-own') path = 'tasks-own';

    return target.call({}, path, fallBackErr, toast ?? true, { params: cleanUp(params) });
  },

});
