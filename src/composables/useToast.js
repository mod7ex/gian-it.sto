import { h, createApp, ref, defineComponent, computed, watch, TransitionGroup } from 'vue';
import { CheckIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/vue/outline';
import Toast from '@/UI/Toast.vue';

let ToastsApp;

const toastsList = ref(new Map()); // Map works well with frequent deletion and adding

export const isEmptyToastsList = computed(() => toastsList.value.size === 0);

const closeToast = (toastKey) => { toastsList.value.delete(toastKey); };

const ToastsComponent = defineComponent({
  setup() {
    const list = computed(() => Array.from(toastsList.value.entries()).filter(([key]) => key !== '_'));

    return () => h('div',
      {
        'aria-live': 'assertive',
        class: 'fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50',
        // class: 'fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50 bg-red-300',
      },
      [
        h(TransitionGroup, {
          name: 'toasts-list',
          tag: 'div',
          class: 'w-full flex flex-col items-center space-y-4',
          // class: 'w-full flex flex-col items-center space-y-4 bg-blue-600',
        },
        // we could've used toastsList directly
        list.value.map(([key, props]) => h(Toast, { ...props, key, onClose: () => closeToast(key) }))),
      ]);
  },
});

watch(isEmptyToastsList, (v) => {
  if (v) {
    if (!ToastsApp) return;
    setTimeout(() => {
      ToastsApp.unmount();
      ToastsApp = undefined;
    }, 500);
    return;
  }

  ToastsApp = createApp(ToastsComponent);
  ToastsApp.mount('#sto-toasts');
});

const create = (text, title, color, icon, bool = true) => {
  const key = Date.now().toString();

  if (isEmptyToastsList.value) toastsList.value.set('_', 'just so that the app mount up');

  setTimeout(() => {
    toastsList.value.set(key, { color, icon, text, title });

    closeToast('_');

    setTimeout(() => { closeToast(key); }, import.meta.env.STO_TOAST_TTL);
  }, 100);

  return bool;
};

const success = (_text, _title) => create(_text, _title, 'green', CheckIcon);
const primary = (_text, _title) => create(_text, _title, 'blue', CheckIcon);
const danger = (_text, _title) => create(_text, _title, 'red', ExclamationIcon, false);
const warn = (_text, _title = 'Предупреждение!') => create(_text, _title, 'yellow', ExclamationIcon, false);
const info = (_text, _title = 'Info!') => create(_text, _title, 'gray', InformationCircleIcon);

export default function () { return { success, info, primary, danger, warn }; }
