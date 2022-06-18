import { defineComponent, h, Suspense, onErrorCaptured, ref, computed } from 'vue';
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
  [h(ExclamationIcon, { class: 'h-5 w-5 mx-2' }), text],
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

    setup({ loadingMsg, errorMsg }, { slots }) {
      const errorMessage = ref();

      onErrorCaptured((e) => {
        console.log(e);
        errorMessage.value = e.message || errorMsg;
      });

      const isThereError = computed(() => !!errorMessage.value);

      const Fallback = FallbackComp ?? defaultFallback(loadingMsg);

      return () => h(
        Suspense,
        {},
        {
          default: () => (Comp ? h(Comp) : slots.default()),
          fallback: () => (!isThereError.value ? Fallback : errorFallback(errorMessage.value)),
        },
      );
    },
  });
}
