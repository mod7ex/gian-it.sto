<script setup>
import { PlusIcon } from '@heroicons/vue/outline';
import { onMounted, ref, watch } from 'vue';
import Draggable from 'vuedraggable';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';
import ItemVue from '@/Partials/processes/DcTemplate/Item.vue';
import { debounce } from '~/helpers';

const props = defineProps({ modelValue: [Object, String, Number, Array] });

const emit = defineEmits(['update:modelValue']);

const localTitle = ref('...');
const localItems = ref([]);

const add = () => { localItems.value.push({ id: `${Date.now()}-${localItems.value.length}`, name: '...' }); };

watch([localItems, localTitle], debounce(([items, title]) => {
  emit('update:modelValue', { items: items.map(({ name }) => name), title });
}, 1000), { deep: true });

onMounted(() => {
  if (typeof props.modelValue === 'object' && !Array.isArray(props.modelValue)) {
    localTitle.value = props.modelValue?.title ?? '...';
    localItems.value = [...(props.modelValue?.items?.map((name, id) => ({ name, id })) ?? [{ id: Math.random(), name: '...' }])];
  }
});

/*
  const log = async (e) => {
    const { oldIndex, newIndex } = e;
    const oldItem = { ...localItems.value[oldIndex] };
    const newItem = { ...localItems.value[newIndex] };

    localItems.value[oldIndex] = newItem;
    localItems.value[newIndex] = oldItem;
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
            v-model="localTitle"
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
      :list="localItems"
      class="grid grid-cols-12 gap-3 mt-4"
    >
      <template #item="{index}">
        <item-vue
          class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          :key="localItems[index].id"
          :removable="true"
          @remove="() => {localItems.splice(index, 1)}"
        >
          <template #header>Вопрос чекпоинт</template>
          <template #body>
            <input-text
              tag="p"
              class="w-full p-2"
              v-model="localItems[index].name"
              tag-class="text-center text-lg p-2"
            />
          </template>
        </item-vue>
      </template>
    </draggable>

  </div>
</template>

<style scoped>
.ghost { opacity: 0.1; }
</style>
