<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import MultiSelect from '@/UI/MultiSelect.vue';
import service from '~/services/processes/task-form';
import orderStagesStore from '~/store/orders/stages';
import processStore from '~/store/processes/index';
import rolesStore from '~/store/roles';
import dcTemplatesStore from '~/store/processes/diagnostic-card';

const { load: loadOrderStages, options: OrderStagesOptions } = orderStagesStore;
const { load: loadProcesses, options: processOptions } = processStore;
const { options, load } = rolesStore;
const { t_options, loadTemplates } = dcTemplatesStore;

const { fields, atMounted } = service();

await Promise.all([load(), atMounted(), loadOrderStages(), loadProcesses(), loadTemplates()]);

</script>

<template>
    <div class="grid grid-cols-12 gap-6">

        <!-- **************************************************************** -->
        <div class="col-span-12 sm:col-span-4">
            <Input label="Название задачи" v-model="fields.name" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Времени на выполнение (в часах)" type="number" v-model="fields.time" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Input label="Порядок" type="number" v-model="fields.position" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Этап заказ-нарядa" :options="OrderStagesOptions" v-model="fields.order_stage_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Роль исполнителя" :options="options" v-model="fields.role_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <Select label="Шаблон диагностической карты" :options="t_options" v-model="fields.dc_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
            <multi-select label="Категории процессов" :options="processOptions" v-model="fields.process_categories" />
        </div>
    </div>
</template>
