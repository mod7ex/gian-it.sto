import { ref } from 'vue';
import { isEmptyToastsList } from '~/composables/useToast';

export const loading = ref(false);

let timer;

export const pingLoader = () => {
  if (isEmptyToastsList.value) {
    loading.value = true;

    clearTimeout(timer);
    timer = setTimeout(() => {
      loading.value = false;
    }, import.meta.env.STO_NAVIGATION_LOADER_DURATION);
  }
};

/*
  STO_NAVIGATION_LOADER_DURATION is like the duration that app takes to laod next route
  we have chosen a constant for STO_NAVIGATION_LOADER_DURATION,

  we could have started the loader before entring the route and then closing it later when we're in the route
*/
