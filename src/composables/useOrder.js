import { ref, computed, watch, defineComponent, h, Transition } from 'vue';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/solid';

/*

  mod ==> 1 or -1

*/
let cb;

let pivot;

let change;

const criterias = computed(() => Object.keys(pivot));

const active = ref(false);

const mod = ref();

const criteria = ref();

const key = computed(() => `${criteria.value}-${mod.value > 0 ? 'a' : 'de'}sc`);

const sort = computed(() => pivot[criteria.value].sort);

// **********************************************************************

const comp = () => defineComponent({
  setup() {
    const cclass = 'py-2 px-4 border cursor-pointer hover:bg-gray-50 flex justify-between items-center';

    return () => h(
      Transition,
      { name: 'filter' },
      () => [
        active.value ? h(
          'div',
          { class: 'text-gray-600' },
          criterias.value.map((c) => h(
            'div',
            { key: c, onClick: () => change(c), class: cclass },
            [
              h('span', pivot[c].label),
              c === criteria.value ? h(mod.value === 1 ? ArrowUpIcon : ArrowDownIcon,
                { class: 'w-4 h-4 text-gray-400' }) : null,
            ],
          )),
        ) : null,
      ],
    );
  },
});

export default function order(payload, defaultCriteria, onReorderCb, defaultMod = -1) {
  const reset = (bool) => {
    mod.value = defaultMod; // return to desc(default) order mod
    if (!bool) return;
    criteria.value = defaultCriteria;
  };

  change = (slectedCriteria) => {
    if (criteria.value === slectedCriteria) {
      mod.value *= -1;
      return;
    }

    reset();
    criteria.value = slectedCriteria;
  };

  pivot = payload;

  cb = onReorderCb;

  reset(true);

  watch(key, () => cb((a, b) => (sort.value)(a, b) * mod.value));

  return {
    active,
    mod,
    criteria,
    key,
    pivot,
    criterias,
    sort,
    reset,
    change,
    comp,
  };
}
