import { h, createApp, ref, defineComponent, computed, watch } from 'vue';
import { CheckIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/vue/outline';
import Toast from '@/UI/Toast.vue';

let ToastsApp;

const toastsList = ref([]); // there might be some issues using array we can implement it using Set
const isEmptyToastsList = computed(() => toastsList.value.length === 0);

const clear = () => {
  toastsList.value = [];
};

const closeToast = (toastKey) => {
  const i = toastsList.value.findIndex(({ key }) => key === toastKey);
  (i !== -1) && toastsList.value.splice(i, 1);
};

const ToastsComponent = defineComponent({
  setup() {
    const list = computed(() => toastsList.value);

    return () => h('div',
      {
        'aria-live': 'assertive',
        class: 'fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50',
      },
      [h(
        'div',
        { class: 'w-full flex flex-col items-center space-y-4' },
        list.value.map((props) => h(Toast, { ...props, onClose: () => closeToast(props.key) })), // we could've used toastsList directly
      )]);
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
  toastsList.value.push({ color, icon, text, title, key });

  setTimeout(() => { closeToast(key); }, import.meta.env.STO_TOAST_TTL);

  return bool;
};

const success = (_text, _title) => create(_text, _title, 'green', CheckIcon);
const primary = (_text, _title) => create(_text, _title, 'blue', CheckIcon);
const danger = (_text, _title) => create(_text, _title, 'red', ExclamationIcon, false);
const warn = (_text, _title) => create(_text, _title, 'yellow', ExclamationIcon, false);
const info = (_text, _title = 'Info!') => create(_text, _title, 'gray', InformationCircleIcon);

export default function useToast() {
  return { success, info, primary, danger, warn, clear };
}
