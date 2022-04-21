import { ref, h } from "vue";

const isOpenToast = ref(false);

export default function useToast() {
  function setIsShowToast(value) {
    isOpenToast.value = value;
  }

  //   we can add message and title and color and icon to showToast function
  function showToast() {
    setIsShowToast(true);
    setTimeout(setIsShowToast, 5000, false);
  }

  let render = () => () =>
    h("div", "ddddddddddddddddddddddddddddddddddddddddddd");

  return { setIsShowToast, isOpenToast, showToast, render };
}
