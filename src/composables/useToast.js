import { h, createApp, ref, defineComponent, computed, watch } from 'vue';
import { CheckIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/vue/outline';
import Toast from '~/components/Partials/Toast.vue';
// import Toast from '@/UI/Toast.vue';

let ToastsApp;

const toastsList = ref([]);
const isEmptyToastsList = computed(() => toastsList.value.length === 0);

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
        list.value.map((props) => h(Toast, { ...props })), // we could've used toastsList directly
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

  setTimeout(() => {
    const i = toastsList.value.findIndex((item) => item.key === key);
    (i !== -1) && toastsList.value.splice(i, 1);
  }, import.meta.env.STO_TOAST_TTL);

  return bool;
};

const success = (_text, _title) => create(_text, _title, 'green', CheckIcon);
const info = (_text, _title = 'Info!') => create(_text, _title, 'gray', InformationCircleIcon);
const primary = (_text, _title) => create(_text, _title, 'blue', CheckIcon);
const danger = (_text, _title) => create(_text, _title, 'red', ExclamationIcon, false);
const warn = (_text, _title) => create(_text, _title, 'yellow', ExclamationIcon, false);

export default function useToast() {
  return { success, info, primary, danger, warn };
}
