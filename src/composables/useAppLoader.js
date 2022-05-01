import { ref } from 'vue';

export const loading = ref(false);

let timer;

export const pingLoader = () => {
  loading.value = true;

  clearTimeout(timer);
  timer = setTimeout(() => {
    loading.value = false;
  }, import.meta.env.STO_NAVIGATION_LOADER_DURATION);
};

// STO_NAVIGATION_LOADER_DURATION is like the duration that app takes to laod next route
