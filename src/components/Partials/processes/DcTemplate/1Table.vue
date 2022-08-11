<script setup>
import { reactive } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';

const payload = reactive({
  title: 'some randome title for the field',
  cols: 3,
  fields: [
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
  ],
});

</script>

<template>
  <!-- CheckPoints 1 -->
  <div class="flex justify-center flex-col items-center mb-9 border-t border-dotted border-black">
      <input type="number" v-model="payload.cols" max="4" min="1" class="p-1 rounded w-16 -mt-4">

      <input-text
        v-model="payload.title"
        tag="h3"
        tag-class="text-center text-lg mt-1 mb-3"
        class="mt-1 mb-3 w-full"
      />

      <ul class="flex-grow border-t border-l border-black" :class="`check-points-${payload.cols}`">
          <li
              v-for="(item, i) in payload.fields"
              :key="`checkboxe-${0}-${i}`"
              :class="['border-r border-b border-black flex justify-between items-stretch']"
          >
              <input-text
                v-model="payload.fields[i]"
                tag="span"
                tag-class="text-sm p-2 flex-grow flex flex-col justify-center"
                class="w-full"
              />
              <span class="px-6 border-black border-l"></span>
          </li>
      </ul>
  </div>
  <!-- *********** -->
</template>

<style scoped>
.check-points-1 {
  display: grid;
  grid-template-columns: minmax(200px, max-content) ;
}

.check-points-2 {
  display: grid;
  grid-template-columns: minmax(200px, max-content) minmax(200px, max-content) ;
}

.check-points-3 {
  display: grid;
  grid-template-columns: minmax(200px, max-content) minmax(200px, max-content) minmax(200px, max-content);
}

.check-points-4 {
  display: grid;
  grid-template-columns: minmax(200px, max-content) minmax(200px, max-content) minmax(200px, max-content) minmax(200px, max-content);
}
</style>
