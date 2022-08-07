import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

/*
  Always should be used inside a scope 'component scope'
*/

const isThePageFuncky = (_name, route) => {
  if (typeof _name === 'string') {
    return route?.name === _name;
  }

  if (Array.isArray(_name)) {
    for (let i = 0; i < _name.length; i++) {
      if (isThePageFuncky(_name[i])) return true;
    }

    return false;
  }

  return false;
};

export default function useAppRouter(pageName = '_') {
  const [router, route] = [useRouter(), useRoute()];

  const isThePage = computed(() => isThePageFuncky(pageName, route));

  const redirectTo = async (to = '/') => {
    if (!to || !to?.name) return;
    await router.push(to); // we can handle navigation failure here
  };

  const back = () => router.back(); // don't use destructuring because it depends on the current scope

  const currentPageName = computed(() => route?.name);
  const params = computed(() => route?.params);
  const query = computed(() => route?.query);
  const fullPath = computed(() => route?.fullPath);

  const isCurrentFullPath = (payload, dynamic = false) => {
    if (!dynamic) return router.resolve(payload).fullPath === route?.fullPath;
    return computed(() => router.resolve(payload).fullPath === route?.fullPath);
  };

  return {
    route,
    router,
    isThePage,
    redirectTo,
    currentPageName,
    params,
    query,
    fullPath,
    isCurrentFullPath,
    back,
  };
}
