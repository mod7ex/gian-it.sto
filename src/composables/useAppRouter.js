import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

export default function useAppRouter(pageName = '_') {
  const route = useRoute();
  const router = useRouter();

  const isThePage = computed(() => route.name === pageName);

  const moveTo = async (to = '/') => {
    if (!to || to === {}) return;
    await router.push(to);
  };

  return {
    route,
    router,
    isThePage,
    moveTo,
  };
}
