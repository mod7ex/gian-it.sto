<script setup>
import { reactive } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';

const payload = reactive({
  split: 1,
  name: 'indication',
  field: 'lorum ipsum tti',
});

</script>

<template>
<!-- Text 2 -->
  <div class="border-t border-dotted border-black mb-9">
    <input type="number" v-model="payload.split" max="2" min="1" class="p-1 rounded w-16 mb-3 block -mt-4 mx-auto">
    <ul class="grid border border-black" :class="`grid-cols-${3-payload.split}`">
      <li :class="['col-span-1 flex border-b', payload.split == 2 ? 'border-black' : '']">
          <input-text
            v-model="payload.name"
            tag-class="text-sm p-2"
            tag="span"
            class="border-r border-black flex items-center indication-item"
          />
        <span class="px-44"></span>
      </li>

      <li class="col-span-1 flex">
        <input-text
          v-model="payload.field"
          tag-class="text-sm p-2"
          tag="span"
          :class="['flex items-center border-r border-black indication-item', payload.split != 2 ? 'border-l' : '']"
        />
        <span class="px-44"></span>
      </li>
    </ul>
  </div>
<!-- *********** -->
</template>

<style scoped>
.indication-item {
  max-width: max-content;
}
</style>
