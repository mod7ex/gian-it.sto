import { h, createApp, ref, defineComponent, computed, watch, Transition } from 'vue';
import { CheckIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/vue/outline';
import Toast from '@/UI/Toast.vue';

let ToastsApp;

const toastsList = ref(new Map()); // Map works well with frequent deletion and adding

export const isEmptyToastsList = computed(() => toastsList.value.size === 0);

const closeToast = (toastKey) => { toastsList.value.delete(toastKey); };

const ToastsComponent = defineComponent({
  setup() {
    const list = computed(() => Array.from(toastsList.value.entries()));

    return () => h('div',
      {
        'aria-live': 'assertive',
        class: 'fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50',
      },
      [h(
        'div',
        { class: 'w-full flex flex-col items-center space-y-4' },

        // we could've used toastsList directly
        list.value.map(([key, props]) => h(Transition, {
          name: 'toast',
          enterFromclass: 'opacity-0',
          enterActiveclass: 'ease-out duration-300 transition-all',
          enterToclass: 'opacity-100',
          leaveActiveclass: 'transition-all ease-in duration-300',
          leaveFromclass: 'opacity-100',
          leavetoclass: 'opacity-0',
        }, () => h(Toast, { ...props, key, onClose: () => closeToast(key) }))),
      ),

      ]);
  },
});

const newToastApp = () => createApp(ToastsComponent);

watch(isEmptyToastsList, (v) => {
  if (v) {
    if (!ToastsApp) return;
    ToastsApp.unmount();
    ToastsApp = undefined;
    return;
  }

  ToastsApp = newToastApp();
  ToastsApp.mount('#sto-toasts');
});

const create = (text, title, color, icon, bool = true) => {
  const key = Date.now().toString();

  toastsList.value.set(key, { color, icon, text, title });

  setTimeout(() => { toastsList.value.delete(key); }, import.meta.env.STO_TOAST_TTL);

  return bool;
};

const success = (_text, _title) => create(_text, _title, 'green', CheckIcon);
const primary = (_text, _title) => create(_text, _title, 'blue', CheckIcon);
const danger = (_text, _title) => create(_text, _title, 'red', ExclamationIcon, false);
const warn = (_text, _title = 'Предупреждение!') => create(_text, _title, 'yellow', ExclamationIcon, false);
const info = (_text, _title = 'Info!') => create(_text, _title, 'gray', InformationCircleIcon);

export default function useToast() { return { success, info, primary, danger, warn }; }
