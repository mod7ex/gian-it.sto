<script setup>
import { reactive } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';
import ItemVue from '@/Partials/processes/DcTemplate/Item.vue';

const payload = reactive({
  title: 'some randome title for the field',
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
  <div class="">
      <!-- <input-text
        v-model="payload.title"
        tag="h3"
        tag-class="text-center text-lg mt-1 mb-3"
        class="mt-1 mb-3 w-full"
      /> -->
      <item-vue >
        <template #header></template>
        <template #body></template>
      </item-vue>
  </div>
</template>
