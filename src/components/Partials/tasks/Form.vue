<script setup>
import { computed, watch, defineComponent, h } from 'vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/tasks/form';
import { tasksColorMap, maybeRun } from '~/helpers';
import userStore from '~/store/employees';
import departmentStore from '~/store/departments';
import pipelineStore from '~/store/pipelines';
import stagesStore from '~/store/pipelines/stages';
import orderStore from '~/store/orders/orders';
import Badge from '@/UI/Badge.vue';
import proxiedSelect from '@/StoSelect';
import useAppRouter from '~/composables/useAppRouter.js';

const { route } = useAppRouter();

const { current } = departmentStore;
const { load, options } = userStore;
const { options: orderOptions, load: loadOrders } = orderStore;
const { state, load: loadFunnels, options: pipelinesOptions } = pipelineStore;
const { load: loadStages, options: stagesOptions } = stagesStore;

const { fields, atMounted, log, isEditPage, selectedFunnelsIds } = service(route.query.order_id);

const statusOptions = Object.entries(tasksColorMap).map(([value, { label }]) => ({ label, value }));

const removeItem = (resource) => maybeRun((i) => resource.splice(i, 1), computed(() => resource.length > 1));
let removeCheckbox;
let removeFunnel;

await Promise.all([
    loadOrders({ department_id: current.value ?? '' }),
    load({ department_id: current.value ?? '' }),
    loadFunnels(),
    atMounted()
]).then(() => {
    removeCheckbox = removeItem(fields.checkboxes);
    removeFunnel = removeItem(fields.pipelines);
});

const StagesSelection = proxiedSelect(state, fields);

const cannotAdd = computed(() => pipelinesOptions.value.map(({ value }) => value).length === (new Set(selectedFunnelsIds.value)).size);
const notSelectedFunnels = computed(() => pipelinesOptions.value.filter(({ value }) => !selectedFunnelsIds.value.includes(Number(value))));

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-3">
            <Input label="Название задачи" v-model="fields.name" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Крайний срок" type="date" v-model="fields.deadline_at" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Исполнитель" :options="options" v-model="fields.user_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Заказ наряд" :options="orderOptions" v-model="fields.order_id" :disabled="route.query.order_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Позиция" type="number" :step="1" v-model="fields.position" />
        </div>

        <div class="col-span-12 sm:col-span-3" v-if="isEditPage">
            <Select label="Статус" :options="statusOptions" v-model="fields.status" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Начать с" type="date" v-model="fields.start_at" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Конец в" type="date" v-model="fields.end_at" />
        </div>

<!--  -->
        <div class="col-span-12 sm:col-span-12">
            <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Воронки</label> -->
            <ul>
                <li v-for="(p, i) in fields.pipelines" :key="'input-'+i" class="flex items-center">
                    <Select class="mr-3 pipeline w-full" :label="`Воронка ${i + 1}`" :options="pipelinesOptions" v-model="fields.pipelines[i].pipeline_id" />
                    <StagesSelection :index="i" :pipeline_id="fields.pipelines[i].pipeline_id" v-model="fields.pipelines[i].stage_id" />
                    <Button color="red" size="sm" @click="removeFunnel(i)">Удалить</Button>
                </li>
            </ul>
            <Button v-if="!cannotAdd" size="xs" class="mt-4" @click="fields.pipelines.push({})">Добавить</Button>
        </div>
<!--  -->

        <hr class="col-span-12" />

        <div class="col-span-12 sm:col-span-12">
            <Wysiwyg label="Текст задачи" v-model="fields.description" />
        </div>

        <hr class="col-span-12" />

        <div class="col-span-12 sm:col-span-12">
            <label class="block text-sm font-medium text-gray-700 mb-2">Чек лист</label>
            <ul>
                <li v-for="(c, i) in fields.checkboxes" :key="'input-'+i" class="flex items-start mb-2">
                    <span class="w-5 pt-2">{{ i + 1 }}</span>
                    <Input rows="1" class="flex-grow mx-2" placeholder="Текст задачи" v-model="fields.checkboxes[i].description" />
                    <Button color="red" size="sm" @click="removeCheckbox(i)">Удалить</Button>
                </li>
            </ul>
            <Button size="xs" class="mt-4" @click="fields.checkboxes.push({ description: '' })">Добавить</Button>
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

<style scoped>
.pipeline {
    max-width: 300px;
}
</style>
