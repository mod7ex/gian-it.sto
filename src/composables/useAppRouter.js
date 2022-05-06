import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

let routerInstance;
let routeInstance;

const redirectTo = async (to = '/') => {
  if (!to || to === {}) return;
  await routerInstance.push(to); // we can handle navigation failure here
};

const currentPageName = computed(() => routeInstance?.name);
const params = computed(() => routeInstance?.params);
const query = computed(() => routeInstance?.query);
const fullPath = computed(() => routeInstance?.fullPath);

const isCurrentFullPath = (payload, dynamic = false) => {
  if (!dynamic) return routerInstance.resolve(payload).fullPath === routeInstance?.fullPath;
  return computed(() => routerInstance.resolve(payload).fullPath === routeInstance?.fullPath);
};

export default function useAppRouter(pageName = '_') {
  [routerInstance, routeInstance] = [useRouter(), useRoute()];

  const isThePage = computed(() => routeInstance?.name === pageName);

  return {
    route: routeInstance,
    router: routerInstance,
    isThePage,
    redirectTo,
    currentPageName,
    params,
    query,
    fullPath,
    isCurrentFullPath,
  };
}
