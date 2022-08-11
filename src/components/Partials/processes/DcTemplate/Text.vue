<script setup>
import { reactive } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';

const payload = reactive({
  title: 'the heading of the paragraph goes here',
  lines: 3,
});

const id = Math.random();

</script>

<template>
<!-- Text 2 -->
  <div class="flex flex-col border-t border-dotted border-black mb-9">
    <input type="number" v-model="payload.lines" max="9" min="1" class="p-1 rounded w-16 -mt-4 mx-auto">

    <input-text
      v-model="payload.title"
      tag="h3"
      tag-class="text-center text-lg my-3"
      class="mt-1 mb-3 w-full"
    />

    <div>
      <span
        v-for="i in payload.lines"
        :key="`${id}-${i}`"
        class="mb-2 p-3 block"
        :class="[i == 1 ? 'pl-12' : '']"
      >
      <span class="block border-b border-gray-400"></span>
      </span>
    </div>
  </div>
<!-- *********** -->
</template>
