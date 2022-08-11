<script setup>
import { PlusIcon } from '@heroicons/vue/outline';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/processes/diagnostic-card-form';
import FTable from './DcTemplate/1Table.vue';
import STable from './DcTemplate/2Table.vue';
import FText from './DcTemplate/Text.vue';
import Indication from './DcTemplate/Indication.vue';

const { dc_template, atMounted, v$ } = service();

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

        <div class="border my-3 col-span-12 bg-gray-50 p-9 rounded">

            <f-table />
            <s-table />
            <f-text />
            <Indication />

            <div class="mx-auto max-w-md h-16 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in rounded-md p-3 shadow border-dashed border border-gray-400 cursor-pointer">
                <PlusIcon class="w-8 h-8 text-gray-600 mx-auto" />
            </div>
        </div>

        <TextArea class="col-span-12 mt-2" label="Примечание" v-model="dc_template.note" />
    </div>
</template>
