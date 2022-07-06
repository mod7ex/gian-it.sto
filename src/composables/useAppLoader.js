import { ref } from 'vue';
import { isEmptyToastsList } from '~/composables/useToast';

/*
 *  VITE_NAVIGATION_LOADER_DURATION is like the duration that app takes to laod next route
 *  we have chosen a constant for VITE_NAVIGATION_LOADER_DURATION,
 *
 *  we could have started the loader before entring the route and then closing it later when we're in the route
*/

export const loading = ref(false);

let timer;

export const pingLoader = (bool = true) => {
  if (isEmptyToastsList.value) {
    clearTimeout(timer);

    if (bool) loading.value = bool;

    timer = setTimeout(() => {
      loading.value = false;
    }, import.meta.env.VITE_NAVIGATION_LOADER_DURATION);
  }
};
