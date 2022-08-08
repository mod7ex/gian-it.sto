<script setup>
import { computed, ref } from 'vue';
import Button from '@/UI/Button.vue';
import useIntersectionObserver from '~/composables/useIntersectionObserver';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },

  options: {
    type: Array,
    required: false,
    default: [],
  },

  help: {
    type: String,
    required: false,
    default: '',
  },

  error: {
    type: String,
    required: false,
    default: '',
  },

  modelValue: {
    type: [String, Number, Array],
    required: false,
    default: '',
  },

  search: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'bottomTouched']);

const computedOptions = computed(() => props.options?.map((e) => {
  if (e instanceof Object) {
    return e;
  }

  return {
    label: e,
    value: e,
  };
}));

const up = ref(false);
const searchBar = ref();
const searchPayload = ref();

const filteredOptions = computed(() => {
  if (searchPayload.value) {
    const regEx = new RegExp(`${searchPayload.value}`, 'i');
    return computedOptions.value.filter(({ value, label }) => `${value}`.search(regEx) > -1 | `${label}`.search(regEx) > -1);
  }
  return computedOptions.value;
});

const { pixel, container } = useIntersectionObserver(() => {
  emit('bottomTouched');
}, computed(() => filteredOptions.value.length > 0));

const ping = (bool) => { up.value = !!bool; };

const theLabel = computed(() => (computedOptions.value.length === 0
  ? '-- пустой --'
  : props.modelValue
    ? (computedOptions.value.find(({ value }) => value == props.modelValue)?.label ?? 'try change department')
    : '-- выберите --'));

const handelBlur = (e, force = false) => {
  searchPayload.value = undefined;
  if (force) return ping(false);

  // Fix --> https://github.com/vueuse/vueuse/blob/main/packages/core/useActiveElement/index.ts

  // it's important to make this task the last in the task-queue in order to have the input already clicked
  // Fix --> this might create few issues later but we're not sure (^_^)

  setTimeout(() => {
    // console.log(window?.document.activeElement);
    if (window?.document.activeElement === searchBar.value) return;
    ping(false);
  });
};

const dis = computed(() => props.disabled);

</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 text-left"> {{ props.label }} </label>

    <div class="relative">

      <!-- :class="[`border-${props.error ? 'red' : 'gray'}-300 focus:ring-${props.error ? 'red' : 'indigo'}-500 focus:border-${props.error ? 'red' : 'indigo'}-500`]" -->
      <!-- class="mt-1 block w-full py-2 text-base focus:outline-none sm:text-sm rounded-md shadow-sm" -->
      <Button
      :disabled="dis"
        type="secondary"
        :class="['mt-1 w-full text-base font-thin focus:outline-none sm:text-sm rounded-md shadow-sm flex justify-between items-center', dis ? 'bg-gray-100' : 'cursor-pointer']"
        @click="() =>ping(!up)"
        @blur="handelBlur"
      >
        <span :class="['font-normal', dis ? 'text-gray-400' : '']">{{ theLabel }}</span>
        <span class="font-light h-1 w-5 -mt-4">

          <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="up" d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"/>
            <path v-else d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/>
          </svg>

        </span>
      </Button>

      <Transition name="sto-select">
        <div class="absolute right-0 left-0 pt-2 z-50" v-if="up && props.options.length">
          <input
            v-if="props.search"
            :ref="(v) => searchBar = v"
            type="text"
            class="w-full p-2 rounded-md h-9 mb-2 shadow-sm border-gray-300"
            placeholder="Поиск ..."
            @blur="(e) => handelBlur(e, true)"
            v-model="searchPayload"
          >
          <div
            id="listing"
            class="bg-gray-50 border rounded shadow-md overflow-y-scroll"
            :ref="(v)=>{container = v}"
            v-if="filteredOptions.length > 0"
          >
            <span
              class="block text-sm p-2 hover:bg-gray-100 cursor-pointer"
              v-for="item in filteredOptions"
              @click="$emit('update:modelValue', item.value)"
              :key="item.value"
            >{{ item.label }}
            </span>
            <span class="block h-px bg-white">
              <pixel />
            </span>
          </div>
        </div>
      </Transition>

    </div>

    <p class="mt-1 text-xs text-red-600" :class="[`text-${error.lenght ? 'red-600' : 'gray-500'}`]">
      &#160;{{ error ?? help  }}
    </p>
  </div>
</template>

<style scoped>
#listing {
  max-height: 300px;
  height: 100%;
}

#listing::-webkit-scrollbar {
  width: .2em;
  height: .2em;
}

.sto-select-enter-active {
  transition: all 0.2s ease-out;
}

.sto-select-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.sto-select-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.sto-select-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
