import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

export default function useAppRouter(pageName) {
  const route = useRoute();
  const router = useRouter();

  const isThePage = computed(() => route.name === pageName);

  return {
    route,
    router,
    isThePage,
  };
}
