<script setup>
import { TrashIcon } from '@heroicons/vue/outline';

defineProps({
  modelValue: {
    type: String,
  },
});
</script>

<template>
  <div class="mx-auto flex items-center justify-center border-t border-dashed border-gray-400 relative my-6">
      <div class="flex items-center justify-center rounded-md shadow border-dashed border border-gray-400 cursor-pointer -mt-4">
          <span
            :class="['sto-w-200 text-sm text-center transition-colors duration-200 ease-in rounded-l-md py-1 px-6', modelValue == 'check_list' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-100 hover:bg-gray-200']"
            @click="e => $emit('update:modelValue', 'check_list')"
          >
            <p>Чекпоинт</p>
          </span>
          <span
            :class="['sto-w-200 text-sm text-center transition-colors duration-200 ease-in py-1 px-6 border-r border-l border-gray-400 border-dashed', modelValue == 'text' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-100 hover:bg-gray-200']"
            @click="e => $emit('update:modelValue', 'text')"
          >
            <p>Текстовое поле</p>
          </span>
          <span
            :class="['sto-w-200 text-sm text-center transition-colors duration-200 ease-in rounded-r-md py-1 px-6', modelValue == 'indication' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-100 hover:bg-gray-200']"
            @click="e => $emit('update:modelValue', 'indication')"
          >
            <p>Показания</p>
          </span>
      </div>
      <TrashIcon @click="$emit('fieldDropped')" class="w-8 h-8 absolute left-0 -top-4 hover:shadow-lg shadow-md rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-50 transition-colors duration-200 ease-in cursor-pointer p-1" />
  </div>
</template>

<style>
.sto-w-200 {
    min-width: 200px;
}
</style>
