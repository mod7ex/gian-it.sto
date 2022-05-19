import { ref, computed, watch, defineComponent, h, Transition } from 'vue';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/solid';

/*
 *
 * mod ==> 1 or -1
 *
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

// ********************************************************************** Create filter component for users

const comp = (excludedFields = []) => defineComponent({
  setup() {
    const cclass = 'py-1 px-4 h-8 border cursor-pointer hover:bg-gray-50 flex justify-between items-center';

    const fieldsCriterias = criterias.value.filter((item) => !excludedFields.includes(item));

    const count = fieldsCriterias.length;

    return () => h(
      Transition,
      {
        name: 'filter',

        enterFromClass: 'h-0 opacity-0',
        enterToClass: `h-${count * 8}`,
        enterActiveClass: 'transition-all ease-out duration-300',

        leaveFromClass: `h-${count * 8}`,
        leaveActiveClass: 'transition-all ease-in duration-300',
        leaveToClass: 'h-0',
      },
      () => [
        active.value ? h(
          'div',
          { class: 'text-gray-600' },
          fieldsCriterias.map((c) => h(
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
