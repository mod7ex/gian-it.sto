<script setup>

import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import service from '~/services/processes/diagnostic-card-form';
import CheckList from './DcTemplate/CheckList.vue';
import TextField from './DcTemplate/Text.vue';
import Indication from './DcTemplate/Indication.vue';
import DividerVue from './DcTemplate/Divider.vue';

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

        <div class="border my-3 col-span-12 bg-gray-50 rounded p-6">

            <divider-vue />
            <check-list />
        </div>

        <TextArea class="col-span-12 mt-2" label="Примечание" v-model="dc_template.note" />
    </div>
</template>
