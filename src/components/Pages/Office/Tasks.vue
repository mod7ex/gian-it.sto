<script setup>
import { PlusCircleIcon, RefreshIcon } from '@heroicons/vue/outline';
import { ref, watch } from 'vue';
import { debounce, objectSignature } from '~/helpers';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/tasks';
import Table from '@/Partials/tasks/Table.vue';
import useSuspense from '~/composables/useSuspense.js';

import departmentStore from '~/store/departments';

const { current } = departmentStore;

const SuspenseArea = useSuspense();

const { order, filter, resetFilter, fetchTasks } = service();

const { criteriaOptions, criteria } = order;

const filterSignature = ref('');

watch(filter, debounce(() => {
  // if (filter.department_id) {
  if (current.value) {
    filterSignature.value = objectSignature(filter);
  }
}));

</script>

<template>
  <OfficeLayout title="Задачи">

    <template #actions>
      <v-can ability="create tasks">
        <Button color="blue" :link="{ name: 'TaskCreate' }">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </v-can>
    </template>

    <Header>Фильтр</Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-start">
      <Input label="Название" v-model="filter.name"/>

      <div>
        <Label class="mb-1">Статус</Label>

        <ButtonGroup>
          <Button type="secondary" @click="filter.status = 'op'" :class="{'bg-gray-300': filter.type === 'op'}" group="left" class="whitespace-nowrap">В работе</Button>
          <Button type="secondary" @click="filter.status = 'op'" :class="{'bg-gray-300': filter.type === 'op'}" group="right" class="whitespace-nowrap">Закрытые</Button>
        </ButtonGroup>
      </div>

      <div>
        <Select
          label="Исполнитель"
          :options="[{label: 'Не выбрано', value: null}]"
          v-model="filter.user_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Заказ-наряд"
          :options="[{label: 'Не выбрано', value: null}]"
          v-model="filter.order_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Воронка"
          :options="[{label: 'Не выбрано', value: null}]"
          v-model="filter.pipeline_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Сортировать"
          :options="criteriaOptions"
          v-model="criteria"
          class="w-44"
        />
      </div>

      <div class="text-center ml-5">
        <Label>сбросить</Label>
        <Button type="secondary" class="rounded-full" @click="()=>resetFilter()">
          <RefreshIcon class="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>

    <!-- <router-link :to="{name: 'Task', params: {id: 25}}" >go</router-link> -->

    <!-- Table -->
    <suspense-area :key="filterSignature" >
      <Table @bottom-touched="()=>fetchTasks()" />
    </suspense-area>

  </OfficeLayout>
</template>
