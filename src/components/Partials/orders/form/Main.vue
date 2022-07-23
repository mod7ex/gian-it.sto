<script setup>
import { CheckIcon } from '@heroicons/vue/outline';
import { computed, watch, onMounted, ref } from 'vue';
import Button from '@/UI/Button.vue';
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/orders/form';
import userStore from '~/store/employees';
import clientStore from '~/store/clients';
import carStore from '~/store/cars/cars';
import appealReasonStore from '~/store/processes/why';
import processStore from '~/store/processes/index';
import pipelineStore from '~/store/pipelines';
import stagesStore from '~/store/pipelines/stages';
import { maybeRun, generateShapedIdfromId } from '~/helpers';

const { load: loadUsers, options: userOptions } = userStore;
const { load: loadClients, options: clientOptions } = clientStore;
const { load: loadCars, options: carOptions, reset: resetCars } = carStore;
const { load: loadAppealReasons, options: appealReasonOptions } = appealReasonStore;
const { load: loadProcesses, options: processOptions } = processStore;
const { orderFunnelOption } = pipelineStore;
const { load_orders_stages, options: stagesOptions } = stagesStore;

const { fields, atMounted, saveOrder, current, log, isEditPage } = service();

const removeItem = maybeRun((i) => fields.checkboxes.splice(i, 1), computed(() => fields.checkboxes.length > 1));

onMounted(resetCars);

watch(() => fields.client_id, (client_id) => loadCars({ client_id }));

await Promise.all([
  load_orders_stages(),
  loadAppealReasons(),
  loadProcesses(),
  atMounted(),
  loadUsers({ department_id: current.value }),
  loadClients({ department_id: current.value }),
]);

const ID = ref(`#${generateShapedIdfromId(fields.id)}`);

</script>

<template>

  <div>
      <div class="mb-5">
        <Button color="blue" @click="saveOrder"><CheckIcon class="w-5 h-5 mr-1"/>Сохранить</Button>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-3" v-if="isEditPage">
          <Input label="Номер заказ-наряда" disabled v-model="ID" />
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Ответственный" :options="userOptions" v-model="fields.user_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Клиент" :options="clientOptions" v-model="fields.client_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Автомобиль" :options="carOptions" v-model="fields.car_id" :disabled="!fields.client_id" />
        </div>
<!--
        <div class="col-span-12 sm:col-span-3">
          <Input label="Дата создания" type="datetime-local"/>
        </div>
-->
        <div class="col-span-12 sm:col-span-3">
          <Select label="Причина обращения" :options="appealReasonOptions" v-model="fields.appeal_reason_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Процесс" :options="processOptions" v-model="fields.process_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Select label="Воронка" :options="orderFunnelOption" v-model="fields.pipeline_id" disabled  />
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Этап воронки" :options="stagesOptions" v-model="fields.stage_id" />
        </div>

        <div class="col-span-12 sm:col-span-12">
          <TextArea label="Комментарий" v-model="fields.comment" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <label class="block text-sm font-medium text-gray-700 mb-2">Чек лист</label>
            <ul>
                <li v-for="(c, i) in fields.checkboxes" :key="'input-'+i" class="flex items-start mb-2">
                    <span class="w-5 pt-2">{{ i + 1 }}</span>
                    <Input rows="1" class="flex-grow mx-2" placeholder="Текст задачи" v-model="fields.checkboxes[i]" />
                    <Button color="red" size="sm" @click="removeItem(i)">Удалить</Button>
                </li>
            </ul>
            <Button size="xs" class="mt-4" @click="fields.checkboxes.push('')">Добавить</Button>
        </div>

        <div class="col-span-12 sm:col-span-12"><Upload :multiple="true" @selected="log" /></div>

      </div>
  </div>

</template>
