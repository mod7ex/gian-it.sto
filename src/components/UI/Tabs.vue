<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {
    type: Number,
    required: false,
  },

  tabs: Array,
});

const current = ref('main');

const pick = (tb) => { emit('update:modelValue', current.value = tb); };

</script>

<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Выберите пункт</label>
      <select
        class="block mt-4 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        @change="($e) => pick($e.target.value)"
      >
        <option
          v-for="(tab, i) in tabs"
          :key="`option-tab-${i}`"
          :selected="tab.tab == current"
          :value="tab.tab"
        >
          {{ tab.label }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <div class="border-b-2 border-gray-200 z-0">
        <!-- <nav class="-mb-px flex space-x-6" aria-label="Tabs"> -->

          <TransitionGroup name="tabs" tag="nav" class="-mb-px flex space-x-6">
            <div v-for="(tab, i) in tabs" :key="`tab-${i}`" class="flex">

              <button
                @click="() => pick(tab.tab)"
                :aria-current="tab.tab == current ? 'page' : undefined"
                :class="[tab.tab == current ?
                    'cursor-pointer border-blue-500 text-blue-600' :
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'border-b-2 cursor-pointer whitespace-nowrap py-4 px-1 font-medium text-sm',
                    ]"
              >
                {{ tab.label }}
              </button>

            </div>
          </TransitionGroup>

        <!-- </nav> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-enter-active,
.tabs-leave-active {
  transition: all 2s ease;
}
.tabs-enter-from,
.tabs-leave-to {
  opacity: 0;
}
</style>
