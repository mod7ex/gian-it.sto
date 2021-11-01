<script setup>
import {ref} from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const items = ref(props.modelValue);
const update = (index) => {
  for (const key in items.value) {
    items.value[key].current = false;
  }

  if(items.value[index] && items.value[index].current !== undefined) {
    items.value[index].current = true;
  }

  return items.value;
};
</script>

<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Выберите пункт</label>
      <select class="block mt-4 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" @change="$emit('update:modelValue', update($event.target.value))">
        <option v-for="(tab, index) in items"
                :key="tab.label"
                :selected="tab.current"
                :value="index"
        >
          {{ tab.label }}
        </option>
      </select>
    </div>

    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-6" aria-label="Tabs">
          <div v-for="(tab, index) in items" :key="tab.label" class="flex">
            <router-link
              v-if="tab.href && tab.href !== '#'"
              :to="tab.href"
              :aria-current="tab.current ? 'page' : undefined"
              :class="[tab.current ? 'cursor-pointer border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
            >
              {{ tab.label }}
            </router-link>

            <button
              v-else
              @click="$emit('update:modelValue', update(index))"
              :aria-current="tab.current ? 'page' : undefined"
              :class="[tab.current ? 'cursor-pointer border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
            >
              {{ tab.label }}
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
