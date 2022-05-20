import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

export default function useAppRouter(pageName = '_') {
  const [router, route] = [useRouter(), useRoute()];

  const isThePage = computed(() => route?.name === pageName);

  const redirectTo = async (to = '/') => {
    if (!to || to === {}) return;
    await router.push(to); // we can handle navigation failure here
  };

  const back = () => router.back();

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
