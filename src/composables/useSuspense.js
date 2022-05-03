import { defineComponent, h, Suspense, onErrorCaptured, ref } from 'vue';
import { ExclamationIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';

const wrapper = h('div', { class: 'col-span-12 sm:col-span-12 flex justify-center items-center' });

const defaultFallback = (text) => h(
  wrapper,
  {},
  [h(Spinner, { h: 4, w: 4 }, { default: () => h('span', text) })],
);

const errorFallback = (text) => h(
  wrapper,
  { class: 'text-red-600' },
  [h(ExclamationIcon, { class: 'h-5 w-5' }), text],
);

export default function useSuspense(Comp, FallbackComp) {
  return defineComponent({
    props: {
      loadingMsg: {
        type: String,
        default: 'Loading...',
      },

      errorMsg: {
        type: String,
        default: 'Something went wrong!',
      },
    },

    setup({ loadingMsg, errorMsg }) {
      const isThereError = ref(false);

      onErrorCaptured((e) => {
        console.log(e);
        isThereError.value = true;
      });

      const Fallback = FallbackComp ?? defaultFallback(loadingMsg);

      return () => h(
        Suspense,
        {},
        {
          default: () => h(Comp),
          fallback: () => (!isThereError.value ? Fallback : errorFallback(errorMsg)),
        },
      );
    },
  });
}
