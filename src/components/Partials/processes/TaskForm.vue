<script setup>
import { computed, ref } from 'vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import MultiSelect from '@/UI/MultiSelect.vue';
import service from '~/services/processes/task-form';
import { maybeRun } from '~/helpers';
import orderStagesStore from '~/store/orders/stages';
import processStore from '~/store/processes/index';
import pipelineStore from '~/store/pipelines';
import StoFiles from '@/Partials/Files.vue'
import rolesStore from '~/store/roles';
import proxiedSelect from '@/StoSelect';
import useConfirmDialog from '~/composables/useConfirmDialog';
import dcTemplatesStore from '~/store/processes/diagnostic-card';

const { options: t_options, load: loadTemplates } = dcTemplatesStore;
const { simple } = useConfirmDialog();
const { load: loadOrderStages, options: OrderStagesOptions } = orderStagesStore;
const { load: loadFunnels, state, options: pipelinesOptions } = pipelineStore;
const { load: loadProcesses, options: processOptions } = processStore;
const { options, load } = rolesStore;

const { fields, atMounted, log } = service();

const StagesSelection = proxiedSelect(state, fields);

const removeItem = (resource) => maybeRun((i) => resource.splice(i, 1), computed(() => resource.length > 1));

let removeCheckbox;
let removeFunnel;

await Promise.all([load(), loadFunnels(), atMounted(), loadOrderStages(), loadProcesses(), loadTemplates()]).then(() => {
    removeCheckbox = removeItem(fields.process_checkboxes);
    removeFunnel = removeItem(fields.pipelines);
});

const handelBlackListedFile = (id) =>  {
    fields.delete_file_ids.push(id)
    fields.files.deleteById(id)
}

const taskTypeOptions = [{label: 'Задача', value: 'false'}, {label: 'Диагностическая карта', value: 'true'}]

</script>

<template>
    <div class="grid grid-cols-12 gap-6">

        <!-- **************************************************************** -->

        <div class="col-span-12 sm:col-span-4">
            <Select
                :hide-text="true"
                label="Тип"
                v-model="fields.is_map"
                :options="taskTypeOptions"
            />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Название задачи" v-model="fields.name" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Времени на выполнение (в часах)" type="number" v-model="fields.time" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Позиция" type="number" v-model="fields.position" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Этап заказ-нарядa" :options="OrderStagesOptions" v-model="fields.order_stage_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Роль исполнителя" :options="options" v-model="fields.role_id" />
        </div>
        
        <div class="col-span-12 sm:col-span-6">
            <multi-select label="Категории процессов" :options="processOptions" v-model="fields.process_categories" />
        </div>

        <div v-if="fields.is_map == 'true'" class="col-span-12 sm:col-span-6">
            <Select label="Шаблон диагностической карты" :options="t_options" v-model="fields.map_id" />
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

        <div v-if="fields.is_map == 'false'" class="col-span-12 grid grid-cols-12 gap-6" >
            <div class="col-span-12 sm:col-span-12">
                <Wysiwyg label="Текст задачи" v-model="fields.description" />
            </div>

            <div class="col-span-12 sm:col-span-12">
                <label class="block text-sm font-medium text-gray-700 mb-2">Чек лист</label>
                <ul>
                    <li v-for="(c, i) in fields.process_checkboxes" :key="'input-'+i" class="flex items-start mb-2">
                        <span class="w-5 pt-2">{{ i + 1 }}</span>
                        <Input rows="1" class="flex-grow mx-2" placeholder="Текст задачи" v-model="fields.process_checkboxes[i].description" />
                        <Button color="red" size="sm" @click="removeCheckbox(i)">Удалить</Button>
                    </li>
                </ul>
                <Button size="xs" class="mt-4" @click="fields.process_checkboxes.push({description: ''})">Добавить</Button>
            </div>

            <hr class="col-span-12" />

            <sto-files :log="log" :files="fields.files" @file-dropped="(id) => simple(() => handelBlackListedFile(id))" />
        </div>
    </div>
</template>
