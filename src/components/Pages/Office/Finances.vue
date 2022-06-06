<script setup>
import { PlusCircleIcon, CollectionIcon, RefreshIcon } from '@heroicons/vue/outline';
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
import { debounce } from '~/helpers';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { render } = form();

const { filter, order, resetFilter, fetchFinances } = service();

const { criteriaOptions, criteria } = order;

const SuspenseArea = useSuspense();

const filterSignature = ref('');

watch(filter, debounce(() => {
  // if (filter.department_id) { // when problem fixed
  if (current.value) {
    filterSignature.value = Object.keys(filter).reduce((prev, curr) => prev + filter[curr], '');
  }
}), { deep: true }); // will work without deep because values are primary

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

      <!-- Filter -->
      <Header>Фильтр</Header>

      <div class="flex flex-wrap gap-2 items-start">
        <Input label="Название" v-model="filter.name"/>

        <div>
          <Label >Статус</Label>

          <ButtonGroup>
            <Button type="secondary" group="left" class="whitespace-nowrap" @click="filter.type = 'in'">Приход</Button>
            <Button type="secondary" group="right" class="whitespace-nowrap" @click="filter.type = 'out'">Расход</Button>
          </ButtonGroup>
        </div>

        <Input label="Дата от" type="date" v-model="filter.start_date" />
        <Input label="Дата до" type="date" v-model="filter.end_date" />

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

      <suspense-area :key="filterSignature" >
        <Table @bottom-touched="()=>fetchFinances()" />
      </suspense-area>

    </OfficeLayout>
</template>
