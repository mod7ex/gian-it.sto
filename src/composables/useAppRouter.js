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

const isCurrentFullPath = (payload) => routerInstance.resolve(payload).fullPath === routeInstance?.fullPath;

export default function useAppRouter(pageName = '_') {
  const route = useRoute();
  const router = useRouter();

  [routerInstance, routeInstance] = [router, route];

  const isThePage = computed(() => route?.name === pageName);

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
  };
}
