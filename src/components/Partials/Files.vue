<script setup>
import { PaperClipIcon } from '@heroicons/vue/outline';
import Upload from '@/UI/Upload.vue';
import Badge from '@/UI/Badge.vue';

defineProps({
  log: {
    type: Function,
    default: (e) => { console.log(e); },
  },

  files: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['fileDropped']);
</script>

<template>
  <div class="col-span-12 sm:col-span-12 pb-10 grid grid-cols-12">

      <Upload :multiple="true" @selected="log" class="col-span-12 sm:col-span-6" />

      <div
        class="col-span-12 sm:col-span-6 bg-white w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        v-if="files?.length"
      >
          <h2 class="text-gray-600 mb-3 text-center">Файлы</h2>
          <div class="flex items-center justify-center flex-wrap">
              <Badge
                color="blue"
                class="p-6"
                v-for="c in files"
                :key="c.name"
              >
                  <svg class="remove-file" @click="() => $emit('fileDropped', c.id)" clip-rule="evenodd" fill="#2563eb" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/>
                  </svg>
                  <a :href="c.url" target="_blank" class="flex items-center justify-center flex-wrap text-blue-600 hover:text-blue-900">
                    <PaperClipIcon class="w-5 h-5 mr-1"/>
                    <span class="font-bold">{{ c.name }}</span>
                  </a>
              </Badge>
          </div>
      </div>
  </div>
</template>

<style scoped>
svg.remove-file {
    width: 25px;
    height: 25px;
    margin-right: 15px;
    cursor: pointer;
    transition: all .3s ease;
}

svg.remove-file:hover {
    margin-right: 15px;
    fill: #dc2626;
}
</style>
