import { ref, computed, effectScope, onScopeDispose } from 'vue';

let toggles;

export default () => effectScope().run((fields) => {
  if (!toggles) toggles = ref({});

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

  setToggles(fields, false);

  const bitwisedToggles = computed(() => Object.keys(toggles.value).reduce((obj, key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = toggles.value[key] & 1;

    return obj;
  }, {}));

  const truthyTogglesArray = computed(() => Object.keys(toggles.value).filter((key) => toggles.value[key]));

  onScopeDispose(() => {
    toggles = undefined;
  });

  return {
    toggles,
    setToggles,
    truthyTogglesArray,
    bitwisedToggles,
  };
});
