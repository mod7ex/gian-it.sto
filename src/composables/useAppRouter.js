import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

export default function useAppRouter(pageName = '_') {
  const route = useRoute();
  const router = useRouter();

  const moveTo = async (to = '/') => {
    if (!to || to === {}) return;
    await router.push(to);
  };

  const isThePage = computed(() => route.name === pageName);

  return {
    route,
    router,
    isThePage,
    moveTo,
  };
}
