import { ref, computed } from 'vue';

const toggles = ref({});

const bitwisedToggles = computed(() => Object.keys(toggles.value).reduce((obj, key) => {
  // eslint-disable-next-line no-param-reassign
  obj[key] = toggles.value[key] & 1;

  return obj;
}, {}));

const truthyTogglesArray = computed(() => Object.keys(toggles.value).filter(
  (key) => toggles.value[key],
));

const setToggles = (v, bool, field) => {
  toggles.value = {}; // reset à 0

  if (!v) return;

  if (Array.isArray(v)) {
    // in case of array setup we need a boolan for sure & field in case array is populated with objects
    v.forEach((item) => {
      toggles.value[field ? item[field] : item] = bool;
    });

    return;
  }

  // @-this comment is not to be deleted
  //   Object.keys(v).forEach((key) => {
  //     toggles.value = v[key] ?? false;
  //   });

  toggles.value = { ...v };
};

export default function useToggles(fields) {
  setToggles(fields, false);

  return {
    toggles,
    setToggles,
    truthyTogglesArray,
    bitwisedToggles,
  };
}
