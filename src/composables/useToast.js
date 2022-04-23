import { ref } from 'vue';

const defaultToast = {
  open: false,
  color: 'blue',
  icon: null,
  title: '',
  text: 'lorem ipsum',
};

const isOpenToast = ref(defaultToast.open);
const toastColor = ref(defaultToast.color); // red, green, blue, yellow
const toastIcon = ref(defaultToast.icon);
const toastTitle = ref(defaultToast.title);
const toastText = ref(defaultToast.text);

export default function useToast() {
  const resetToast = () => {
    isOpenToast.value = defaultToast.open;
    toastColor.value = defaultToast.color;
    toastIcon.value = defaultToast.icon;
    toastTitle.value = defaultToast.title;
    toastText.value = defaultToast.text;
  };

  function showToast(
    text = defaultToast.text,
    color = defaultToast.color,
    icon = defaultToast.icon,
    title = defaultToast.title,
  ) {
    isOpenToast.value = true;
    toastColor.value = color;
    toastIcon.value = icon;
    toastTitle.value = title;
    toastText.value = text;
    setTimeout(resetToast, 5000);
  }

  return {
    showToast,
    // render,

    isOpenToast,
    toastColor,
    toastIcon,

    toastTitle,
    toastText,
  };
}
