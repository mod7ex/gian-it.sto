<script setup>
import { computed } from 'vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/processes/task-form';
import { maybeRun } from '~/helpers';
import orderStagesStore from '~/store/orders/stages';
import pipelineStore from '~/store/pipelines';
import rolesStore from '~/store/roles';
import proxiedSelect from '@/StoSelect';

const { load: loadOrderStages, options: OrderStagesOptions } = orderStagesStore;
const { load: loadFunnels, state, options: pipelinesOptions } = pipelineStore;
const { options, load } = rolesStore;

const { fields, atMounted, log } = service();

const StagesSelection = proxiedSelect(state, fields);

const removeItem = (resource) => maybeRun((i) => resource.splice(i, 1), computed(() => resource.length > 1));

const removeCheckbox = removeItem(fields.checkboxes);
const removeFunnel = removeItem(fields.pipelines);

await Promise.all([load(), loadFunnels(), atMounted(), loadOrderStages()]);

</script>

<template>
    <div class="grid grid-cols-12 gap-6">

        <!-- **************************************************************** -->
        <div class="col-span-12 sm:col-span-3">
            <Input label="Название задачи" v-model="fields.name" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Времени на выполнение (в часах)" type="number" v-model="fields.time" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Порядок" type="number" v-model="fields.position" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Этап заказа" :options="OrderStagesOptions" v-model="fields.order_stage_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Роль исполнителя" :options="options" v-model="fields.role_id" />
        </div>

<!--  -->
        <div class="col-span-12 sm:col-span-12">
            <ul>
                <li v-for="(p, i) in fields.pipelines" :key="'input-'+i" class="flex items-center">
                    <Select class="mr-3 pipeline w-full" :label="`Воронка ${i + 1}`" :options="pipelinesOptions" v-model="fields.pipelines[i].pipeline_id" />
                    <StagesSelection :index="i" :pipeline_id="fields.pipelines[i].pipeline_id" v-model="fields.pipelines[i].stage_id" />
                    <Button color="red" size="sm" @click="removeFunnel(i)">Удалить</Button>
                </li>
            </ul>
            <Button size="xs" class="mt-4" @click="fields.pipelines.push({})">Добавить</Button>
        </div>
<!--  -->

        <div class="col-span-12 sm:col-span-12">
            <Wysiwyg label="Текст задачи" v-model="fields.description" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <label class="block text-sm font-medium text-gray-700 mb-2">Чек лист</label>
            <ul>
                <li v-for="(c, i) in fields.checkboxes" :key="'input-'+i" class="flex items-start mb-2">
                    <span class="w-5 pt-2">{{ i + 1 }}</span>
                    <Input rows="1" class="flex-grow mx-2" placeholder="Текст задачи" v-model="fields.checkboxes[i].description" />
                    <Button color="red" size="sm" @click="removeCheckbox(i)">Удалить</Button>
                </li>
            </ul>
            <Button size="xs" class="mt-4" @click="fields.checkboxes.push({description: ''})">Добавить</Button>
        </div>

        <hr class="col-span-12" />

        <div class="col-span-12 sm:col-span-12 pb-10 grid grid-cols-12">

            <Upload :multiple="true" @selected="log" class="col-span-12 sm:col-span-6" />

            <div class="col-span-12 sm:col-span-6" v-if="fields.files.length">
                <h2 class="text-gray-600 mb-3">Файлы</h2>
                <Badge color="green" :point="true" v-for="c in fields.files" :key="c.name">{{ c.name }}</Badge>
            </div>
        </div>
    </div>
</template>
