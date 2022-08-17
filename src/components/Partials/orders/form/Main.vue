<script setup>
import { CheckIcon, PlusCircleIcon } from '@heroicons/vue/outline';
import { computed, watch, onMounted, ref } from 'vue';
import Button from '@/UI/Button.vue';
import TextArea from '@/UI/TextArea.vue';
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import StoSelect from '@/UI/StoSelect.vue';
// import TextArea from '@/UI/TextArea.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/orders/form';
import userStore from '~/store/employees';
import clientStore from '~/store/clients';
import carStore from '~/store/cars/cars';
import appealReasonStore from '~/store/processes/why';
import processStore from '~/store/processes/index';
import orderStagesStore from '~/store/orders/stages';
import carForm from '~/services/cars/carForm';
import clientForm from '~/services/clients/clientForm';
import StoFiles from '@/Partials/Files.vue'
import useConfirmDialog from '~/composables/useConfirmDialog';
import { maybeRun, generateShapedIdfromId } from '~/helpers';

const { options: orderStagesOptions, load: loadOrderStages } = orderStagesStore;
const { load: loadUsers, options: userOptions } = userStore;
const { load: loadClients, options: clientOptions } = clientStore;
const { load: loadCars, options: carOptions, reset: resetCars } = carStore;
const { load: loadAppealReasons, options: appealReasonOptions } = appealReasonStore;
const { load: loadProcesses, options: processOptions } = processStore;

const { fields, atMounted, saveOrder, current, log, isEditPage, route } = service();
const { render } = carForm(true);
const { modalUp } = clientForm(true);

const removeItem = maybeRun((i) => fields.checkboxes.splice(i, 1), computed(() => fields.checkboxes.length > 1));

onMounted(resetCars);

watch(() => fields.client_id, (client_id) => loadCars({ client_id }));

const ID = ref('');

await Promise.all([
  loadOrderStages(),
  loadAppealReasons(),
  loadProcesses(),
  loadUsers({ department_id: current.value }),
  loadClients({ department_id: current.value }),
  atMounted(),
]).then(() => { if(isEditPage.value) {ID.value = `#${generateShapedIdfromId(route.params.id)}`} });

const { simple } = useConfirmDialog();

const handelBlackListedFile = (id) =>  {
    fields.delete_file_ids.push(id)
    fields.files.deleteById(id)
}
</script>

<template>

  <div>
      <div class="mb-5">
        <Button color="blue" @click="saveOrder"><CheckIcon class="w-5 h-5 mr-1"/>Сохранить</Button>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4" v-if="isEditPage">
          <Input label="Номер заказ-наряда" disabled v-model="ID" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Select label="Ответственный" :options="userOptions" v-model="fields.user_id" />
        </div>

        <div class="col-span-12 sm:col-span-4 flex items-center">
          <sto-select :search="true" class="flex-grow mr-1" label="Клиент" :options="clientOptions" v-model="fields.client_id" />
          <PlusCircleIcon class="w-9 text-gray-600 cursor-pointer hover:text-gray-800" @click="() => modalUp()" />
        </div>

        <div class="col-span-12 sm:col-span-4 flex items-center">
          <sto-select
            :search="true"
            class="flex-grow mr-1"
            label="Автомобиль"
            :options="carOptions"
            v-model="fields.car_id"
            :disabled="!fields.client_id"
            :key="fields.client_id"
          />
          <PlusCircleIcon class="w-9 text-gray-600 cursor-pointer hover:text-gray-800" @click="() => render()" />
        </div>
<!--
        <div class="col-span-12 sm:col-span-4">
          <Input label="Дата создания" type="datetime-local"/>
        </div>
-->
        <div class="col-span-12 sm:col-span-4">
          <Select label="Причина обращения" :options="appealReasonOptions" v-model="fields.appeal_reason_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Select label="Процесс" :options="processOptions" v-model="fields.process_category_id" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Select label="Этап заказа" :options="orderStagesOptions" v-model="fields.order_stage_id" />
        </div>

          <div class="col-span-12 sm:col-span-12">
            <TextArea label="Комментарий" v-model="fields.comment" />
          </div>

        <div class="col-span-12">
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

        <sto-files :log="log" :files="fields.files" @file-dropped="(id) => simple(() => handelBlackListedFile(id))" />

      </div>
  </div>

</template>
