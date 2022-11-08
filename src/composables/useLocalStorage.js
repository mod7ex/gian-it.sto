import { shallowRef } from 'vue';

function getStoredValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) return JSON.parse(savedValue);
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export default function useLocalStorage(key, defaultVal) {
  const value = shallowRef(getStoredValue(key, defaultVal));

  const setValue = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    value.value = v;
  };

  return [value, setValue];
}
