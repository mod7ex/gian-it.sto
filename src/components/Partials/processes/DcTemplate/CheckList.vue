<script setup>
import { PlusIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import Draggable from 'vuedraggable';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';
import ItemVue from '@/Partials/processes/DcTemplate/Item.vue';

const title = ref('...');

const items = ref([
  { id: Math.random(), c: '...' },
  // { id: Math.random(), c: 'Lorem ipsum dolor sit amet consectetur. 1' },
  // { id: Math.random(), c: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores? 2' },
]);

const add = () => { items.value.push({ id: Date.now(), c: '...' }); };

/*
const log = async (e) => {
  const { oldIndex, newIndex } = e;
  const oldItem = { ...items.value[oldIndex] };
  const newItem = { ...items.value[newIndex] };

  items.value[oldIndex] = newItem;
  items.value[newIndex] = oldItem;
};
*/

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <item-vue :draggable="false" >
        <template #header>Название блока вопросов</template>
        <template #body>
          <input-text
            v-model="title"
            tag="p"
            tag-class="text-center text-lg p-2"
            class="w-full p-2"
          />
        </template>
      </item-vue>

      <PlusIcon
        @click="add"
        class="hover:shadow-lg mx-auto w-9 h-9 font-bold rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-50 transition-colors duration-200 ease-in cursor-pointer p-1"
      />
    </div>

    <draggable
      item-key="id"
      ghost-class="ghost"
      :list="items"
      class="grid grid-cols-12 gap-3 mt-4"
    >
      <template #item="{index}">
        <item-vue
          class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          :key="items[index].id"
          :removable="true"
          @remove="() => {items.splice(index, 1)}"
        >
          <template #header>Вопрос чекпоинт</template>
          <template #body>
            <input-text
              tag="p"
              class="w-full p-2"
              v-model="items[index].c"
              tag-class="text-center text-lg p-2"
            />
          </template>
        </item-vue>
      </template>
    </draggable>

<!--
    <div class="grid grid-cols-12 gap-3 mt-4">
      <item-vue v-for="(item, i) in items" :key="`${id}-checklist-item-${i}`" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" >
        <template #header>Item {{ i + 1 }}</template>
        <template #body>
          <input-text
            v-model="items[i]"
            tag="p"
            tag-class="text-center text-lg p-2"
            class="w-full p-2"
          />
        </template>
      </item-vue>
    </div>
-->

  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.1;
}
</style>
