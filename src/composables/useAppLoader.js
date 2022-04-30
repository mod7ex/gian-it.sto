import { ref } from 'vue';

const LOADER_TTL_AFTER_NAVIGATING = 1000;

export const loading = ref(false);

let timer;

export const setLoader = (bool) => {
  if (bool) loading.value = true;

  clearTimeout(timer);
  timer = setTimeout(() => {
    loading.value = false;
  }, LOADER_TTL_AFTER_NAVIGATING + (bool ? 500 : 0));
};
