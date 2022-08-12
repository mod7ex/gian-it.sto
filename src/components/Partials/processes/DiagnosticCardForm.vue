<script setup>

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

const payload = ref([
  {
    type: 'check_list',
  },
]);

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

            <divider-vue v-model="payload[0].type" />
            <component :is="FIELD_TYPES[payload[0].type].comp" />
        </div>

        <TextArea class="col-span-12 mt-2" label="Примечание" v-model="dc_template.note" />
    </div>
</template>
