<script setup>
import { PlusCircleIcon, RefreshIcon, ViewBoardsIcon } from '@heroicons/vue/outline';
import { onScopeDispose, ref, watch } from 'vue';
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
import pipelineStore from '~/store/pipelines';
import userStore from '~/store/employees';
import orderStore from '~/store/orders/orders';

const SuspenseArea = useSuspense();

const { order, filter, resetFilter, fetchTasks, current, clearMemo } = service();

const { criteriaOptions, criteria } = order;

const { options, load: loadFunnels } = pipelineStore;
const { options: userOptions, load: loadUsers } = userStore;
const { options: orderOptions, load: loadOrders } = orderStore;

const fillDep = async (department_id) => {
  if (!department_id) return;
  await Promise.all([
    loadFunnels({ type: 'task' }),
    loadUsers({ department_id }),
    loadOrders({ department_id }),
  ]);
};

const filterSignature = ref('');

watch(filter, debounce(() => {
  if (filter.department_id) {
    // if (current.value) {
    filterSignature.value = objectSignature(filter, ['department_id']);
  }
}));

watch(current, fillDep, { immediate: true });

onScopeDispose(clearMemo);

</script>

<template>
  <OfficeLayout title="Задачи">

    <template #actions>
      <Button type="secondary" :link="{ name: 'Funnels' }">
        <ViewBoardsIcon class="w-5 h-5 mr-1"/>Воронка
      </Button>

      <v-can ability="create tasks">
        <Button color="blue" :link="{ name: 'TaskCreate' }">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </v-can>
    </template>

    <Header>Фильтр</Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-1 items-start">
      <div class="w-48">
        <Input label="Название"  v-model="filter.name"/>
      </div>

      <div>
        <Label class="mb-1">Статус</Label>

        <ButtonGroup>
          <Button
            type="secondary"
            @click="filter.status = 'process'"
            group="left"
            :class="['whitespace-nowrap', filter.status === 'process' ? 'bg-green-100' : '']"
          >В работе</Button>
          <Button
            type="secondary"
            @click="filter.status = 'done'"
            group="right"
            :class="['whitespace-nowrap', filter.status === 'done' ? 'bg-indigo-100' : '']"
          >Закрытые</Button>
        </ButtonGroup>
      </div>

      <div>
        <Select
          label="Исполнитель"
          :options="userOptions"
          v-model="filter.author_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Заказ-наряд"
          :options="orderOptions"
          v-model="filter.order_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Воронка"
          :options="options"
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

      <div class="text-center ml-3">
        <Label>сбросить</Label>
        <Button type="secondary" class="rounded-full" @click="()=>resetFilter()">
          <RefreshIcon class="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>

    <!-- Table -->
    <suspense-area :key="`tab-${filterSignature}-${current}`" >
      <Table @bottom-touched="()=>fetchTasks()" />
    </suspense-area>

  </OfficeLayout>
</template>
