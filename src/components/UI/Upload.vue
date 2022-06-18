<script setup>
import { ref } from 'vue';
import Badge from '@/UI/Badge.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const id = Math.floor(Math.random() * 100).toString();

const emit = defineEmits(['selected']);

const files = ref([]);

const handler = (e) => {
  files.value = [...e.target.files].map(({ name }) => name);
  console.log(files);
  emit('selected', e);
};

</script>

<template>

  <label :for="id" class="cursor-pointer hover:text-indigo-500 hover:bg-gray-100 transition-all duration-200 bg-white max-w-lg flex items-center flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <span>{{ title }}</span>
      <p class="py-3">Загрузить файлы или перетащите</p>

      <div class="pb-3" v-if="!!files.length">
        <Badge color="green" :point="true" v-for="c in files" :key="c">{{ c }}</Badge>
      </div>

      <input
        :id="id"
        type="file"
        class="sr-only"
        :multiple="multiple"
        @change="handler"
      />

      <p class="text-xs text-gray-500">формат любой</p>
  </label>

</template>
