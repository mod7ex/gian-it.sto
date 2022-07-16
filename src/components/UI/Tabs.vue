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

const current = ref(0);

const pick = (i) => { emit('update:modelValue', current.value = i); };

</script>

<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Выберите пункт</label>
      <select
        class="block mt-4 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option
          v-for="(tab, i) in tabs"
          :key="`option-tab-${i}`"
          :selected="i == current"
          :value="i"
          @select="() => pick(i)"
        >
          {{ tab }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <div class="border-b-2 border-gray-200">
        <nav class="-mb-px flex space-x-6" aria-label="Tabs">
          <div v-for="(tab, i) in tabs" :key="`tab-${i}`" class="flex">

            <button
              @click="() => pick(i)"
              :aria-current="i == current ? 'page' : undefined"
              :class="[i == current ?
                  'cursor-pointer border-blue-500 text-blue-600' :
                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'border-b-2 cursor-pointer whitespace-nowrap py-4 px-1 font-medium text-sm']"
            >
              {{ tab }}
            </button>

          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
