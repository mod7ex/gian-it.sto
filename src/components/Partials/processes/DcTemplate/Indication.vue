<script setup>
import { onMounted, ref, watch } from 'vue';
import InputText from '@/Partials/processes/DcTemplate/InputText.vue';
import ItemVue from '@/Partials/processes/DcTemplate/Item.vue';
import { debounce } from '~/helpers';

const props = defineProps({ modelValue: [Object, String, Number, Array] });

const emit = defineEmits(['update:modelValue']);

const payload = ref(['...', '...']);

watch(payload, debounce((v) => { emit('update:modelValue', v); }), { deep: true });

onMounted(() => { if (Array.isArray(props.modelValue)) { payload.value = props.modelValue; } });

</script>

<template>
  <div class="flex items-center justify-center">
    <item-vue class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 mx-3" :draggable="false" >
      <template #header>Название поля</template>
      <template #body>
        <input-text
          tag="p"
          class="w-full p-2"
          v-model="payload[0]"
          tag-class="text-center text-lg p-2"
        />
      </template>
    </item-vue>

    <item-vue class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 mx-3" :draggable="false" >
      <template #header>Название поля</template>
      <template #body>
        <input-text
          tag="p"
          class="w-full p-2"
          v-model="payload[1]"
          tag-class="text-center text-lg p-2"
        />
      </template>
    </item-vue>
  </div>
</template>
