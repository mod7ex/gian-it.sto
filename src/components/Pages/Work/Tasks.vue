<script setup>
import { RefreshIcon } from '@heroicons/vue/outline';
import { onMounted, ref, watch } from 'vue';
import Layout from '@/Layout/Work.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import Select from '@/UI/Select.vue';
import orderStore from '~/store/orders/orders';
import service from '~/services/tasks/worker';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/tasks/WorkerTable.vue';
import { debounce, objectSignature } from '~/helpers';
import WorkerBadge from '~/components/Partials/WorkerBadge.vue';

const WorkerTasks = useSuspense(Table);

const { options: orderOptions, load: loadOrders } = orderStore;

const { filter, resetFilter, order: { criteriaOptions }, current, clearMemo } = service();

onMounted(async () => {
  const department_id = current.value;
  if (!department_id) return;
  await loadOrders({ department_id });
});

const filterSignature = ref('-');

watch(filter, debounce(() => { filterSignature.value = objectSignature(filter); }));

clearMemo();

</script>

<template>
  <Layout title="Список задач">

    <worker-badge />

    <Header> Задачи </Header>

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
          label="Заказ-наряд"
          :options="orderOptions"
          v-model="filter.order_id"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Сортировать"
          :options="criteriaOptions"
          v-model="filter.order"
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

    <worker-tasks :key="`tab-${filterSignature}`" />

  </Layout>
</template>
