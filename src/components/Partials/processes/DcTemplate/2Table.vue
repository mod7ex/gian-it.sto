<script setup>
import { reactive } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';

const payload = reactive({
  fields: [
    {
      title: 'some randome title for the field 1',
      cols: 1,
      fields: [
        'Lorem ipsum dolor sit amet consectetur.',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet consectetur.',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
        'Lorem ipsum dolor sit amet.',
      ],
    },
    {
      title: 'some randome title for the field 2',
      cols: 1,
      fields: [
        'Lorem ipsum dolor sit amet consectetur.',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet consectetur.',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores?',
        'Lorem ipsum dolor sit amet.',
      ],
    },
  ],
});

</script>

<template>
  <!-- CheckPoints 2 -->
  <div class="grid grid-cols-2 gap-6">
    <div class="col-span-1 flex flex-col items-center mb-9 border-t border-dotted border-black">
        <input type="number" v-model="payload.fields[0].cols" max="3" min="1" class="p-1 rounded w-16 -mt-4">

        <input-text
          v-model="payload.fields[0].title"
          tag="h3"
          tag-class="text-center text-lg mt-1 mb-3"
          class="mt-1 mb-3 w-full"
        />

        <ul class="grid grid-cols-12 border-t border-l border-black w-full">
            <li
                v-for="(item, i) in payload.fields[0].fields"
                :key="`checkboxe-${0}-${i}`"
                :class="['border-r border-b border-black flex justify-between items-stretch', `col-span-${12/Number(payload.fields[0].cols)}`]"
            >
              <input-text
                v-model="payload.fields[0].fields[i]"
                tag="span"
                tag-class="text-sm p-2 flex-grow flex flex-col justify-center"
                class="w-full"
              />
              <span class="px-6 border-black border-l"></span>
            </li>
        </ul>
    </div>
    <div class="col-span-1 flex flex-col items-center mb-9 border-t border-dotted border-black">
        <input type="number" v-model="payload.fields[1].cols" max="3" min="1" class="p-1 rounded w-16 -mt-4">

        <input-text
          v-model="payload.fields[0].title"
          tag="h3"
          tag-class="text-center text-lg mt-1 mb-3"
          class="mt-1 mb-3 w-full"
        />

        <ul class="grid grid-cols-12 border-t border-l border-black w-full">
            <li
                v-for="(item, i) in payload.fields[1].fields"
                :key="`checkboxe-${0}-${i}`"
                :class="['border-r border-b border-black flex justify-between items-stretch', `col-span-${12/Number(payload.fields[1].cols)}`]"
            >
              <input-text
                v-model="payload.fields[1].fields[i]"
                tag="span"
                tag-class="text-sm p-2 flex-grow flex flex-col justify-center"
                class="w-full"
              />
              <span class="px-6 border-black border-l"></span>
            </li>
        </ul>
    </div>
  </div>
  <!-- *********** -->
</template>
