<script setup>
import { PlusIcon } from '@heroicons/vue/outline';

import { ref, defineAsyncComponent } from 'vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/processes/diagnostic-card-form';
import DividerVue from './DcTemplate/Divider.vue';

const { dc_template, atMounted, v$ } = service();

const FIELD_TYPES = {
  check_list: { code: 1, comp: defineAsyncComponent(() => import('@/Partials/processes/DcTemplate/CheckList.vue')) },
  text: { code: 2, comp: defineAsyncComponent(() => import('@/Partials/processes/DcTemplate/Text.vue')) },
  indication: { code: 3, comp: defineAsyncComponent(() => import('@/Partials/processes/DcTemplate/Indication.vue')) },
};

const payload = ref([]);

const add = () => { payload.value.push({ type: 'check_list' }); };

// await atMounted();

</script>

<template>
    <div class="grid grid-cols-12 gap-6">

        <div class="col-span-6 sm:col-span-6">
            <Input
                label="Название"
                v-model="dc_template.name"
                :required="true"
                :error="v$.name.$errors[0]?.$message"
                @blured="v$.name.$touch"
            />
        </div>

        <div class="border my-3 col-span-12 bg-gray-50 rounded p-6">

            <div v-for="(item, i) in payload" :key="`block-${i}`" class="mb-20" >
              <divider-vue v-model="payload[i].type" @field-dropped="() => {payload.splice(i, 1)}" />
              <component :is="FIELD_TYPES[payload[i].type].comp" />
            </div>

            <div class="mx-auto flex items-center justify-center border-t border-dashed border-gray-400 my-16">
              <PlusIcon
                @click="add"
                class="mx-auto w-8 h-8 -mt-4 hover:shadow-lg shadow-md rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-50 transition-colors duration-200 ease-in cursor-pointer p-1"
              />
            </div>

        </div>

        <TextArea class="col-span-12 mt-2" label="Примечание" v-model="dc_template.note" />
    </div>
</template>
