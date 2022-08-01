<script setup>
import { PlusCircleIcon, CollectionIcon, RefreshIcon, CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/vue/outline';
import { ref, watch } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Select from '@/UI/Select.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import useSuspense from '~/composables/useSuspense.js';
import Table from '@/Partials/finances/Table.vue';
import form from '~/services/finances/form';
import service from '~/services/finances/index';
import { debounce, objectSignature } from '~/helpers';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { render } = form();

const { filter, order, resetFilter, cleanUp } = service();

const { criteriaOptions } = order;

const SuspenseArea = useSuspense(Table);

const filterSignature = ref('');

watch(filter, debounce(() => {
  // if (filter.department_id) { // Fix
  if (current.value) { filterSignature.value = objectSignature(filter); }
}), { deep: true }); // will work without deep because values are primary

cleanUp();

</script>

<template>
    <OfficeLayout title="Финансы">
      <template #actions>
        <Button type="secondary" :link="{name: 'FinanceGroups'}">
          <CollectionIcon class="w-5 h-5 mr-1"/>Группы
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить операцию
        </Button>
      </template>

      <!-- Summary -->
      <Header>сводка</Header>

      <div class="flex flex-wrap items-stretch">
        <div class="flex justify-start items-center rounded shadow p-4 flex-grow">
          <div><CurrencyDollarIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Баланс</h5>
            <h2 class="font-bold text-lg">10 000 0000 &#8381;</h2>
          </div>
        </div>
        <div class="mx-6 flex justify-start items-center rounded shadow p-4 flex-grow">
          <div><RefreshIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Траты</h5>
            <h2 class="font-bold text-lg">-10 0000 &#8381;</h2>
          </div>
        </div>
        <div class="flex justify-start items-center rounded shadow p-4 flex-grow">
          <div><CheckCircleIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Ожидается</h5>
            <h2 class="font-bold text-lg">10 0000 0000 &#8381;</h2>
          </div>
        </div>
      </div>

      <!-- Filter -->
      <Header>Фильтр</Header>

      <div class="flex flex-wrap gap-2 items-start">
        <Input label="Название" v-model="filter.name"/>

        <div>
          <Label >Статус</Label>

          <ButtonGroup>
            <Button type="secondary" group="left" class="whitespace-nowrap" :class="{'bg-green-100': filter.type === 'in'}" @click="filter.type = 'in'">Приход</Button>
            <Button type="secondary" group="right" class="whitespace-nowrap" :class="{'bg-red-100': filter.type === 'out'}" @click="filter.type = 'out'">Расход</Button>
          </ButtonGroup>
        </div>

        <Input label="Дата от" type="date" v-model="filter.start_date" />
        <Input label="Дата до" type="date" v-model="filter.end_date" />

        <div>
          <Select
            label="Сортировать"
            :options="criteriaOptions"
            v-model="filter.order"
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

      <suspense-area :key="`${filterSignature}`" />

    </OfficeLayout>
</template>
