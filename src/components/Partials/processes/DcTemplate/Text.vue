<script setup>
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';
import ItemVue from '@/Partials/processes/DcTemplate/Item.vue';

const props = defineProps({ modelValue: [Object, String, Number, Array] });

defineEmits(['update:modelValue']);

</script>

<template>
  <div class="flex items-center justify-center">
    <item-vue class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" :draggable="false" >
      <template #header>Название текстового поля</template>
      <template #body>
        <input-text
          tag="p"
          class="w-full p-2"
          :modelValue="props.modelValue ?? '...'"
          @update:modelValue="v => { $emit('update:modelValue', v) }"
          tag-class="text-center text-lg p-2"
        />
      </template>
    </item-vue>
  </div>
</template>
