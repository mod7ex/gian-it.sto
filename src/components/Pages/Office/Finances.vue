<script setup>
import { PlusCircleIcon, CollectionIcon, RefreshIcon, CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/vue/outline';
import { ref, watch, computed, onMounted } from 'vue';
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
import $ from '~/helpers/fetch.js';

const { render } = form();

const { filter, order, resetFilter, cleanUp, current, state } = service();

const { criteriaOptions } = order;

const SuspenseArea = useSuspense(Table);

const filterSignature = ref('');

watch(filter, debounce(() => {
  if (current.value) { filterSignature.value = objectSignature(filter); }
}), { deep: true }); // will work without deep because values are primary

cleanUp();

const reducers = {
  balance: (b, curr) => b + (curr.sum * (curr.operation_type === 'in' ? 1 : -1)),
  loss: (b, curr) => b + (curr.sum * (curr.operation_type === 'out' ? 1 : 0)),
  wait: (b, curr) => '0',
};

const reducedState = (reducer, initial) => Array.prototype.reduce.apply(state.raw, [reducer, initial]);

const balance = computed(() => reducedState(reducers.balance, 0));
const loss = computed(() => reducedState(reducers.loss, 0));

const payments = ref([]);
const wating = computed(() => payments.value.reduce((prev, { status, sum }) => ((status === 'wait' ? sum : 0) + prev), 0));

onMounted(async () => {
  let filled = false;
  let page = 1;

  while (!filled) {
    const data = await $({ key: 'payments', params: { status: 'wait', page } });
    payments.value = payments.value.concat(data?.payments ?? []);
    if (data?.meta?.last_page == page) filled = true;
    else page++;
  }

  console.log(payments.value);
});

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
        <div class="flex justify-start items-center rounded shadow p-4 flex-grow bg-gray-50">
          <div><CurrencyDollarIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Баланс</h5>
            <h2 class="font-bold text-lg transactions">{{ balance }} &#8381;</h2>
          </div>
        </div>
        <div class="md:mx-6 flex justify-start items-center rounded shadow p-4 flex-grow bg-gray-50">
          <div><RefreshIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Траты</h5>
            <h2 class="font-bold text-lg transactions">-{{ loss }} &#8381;</h2>
          </div>
        </div>
        <div class="flex justify-start items-center rounded shadow p-4 flex-grow bg-gray-50">
          <div><CheckCircleIcon class="w-7 h-7 mr-4 text-gray-500" /></div>
          <div>
            <h5 class="text-gray-500 font-semibold">Ожидается</h5>
            <h2 class="font-bold text-lg transactions">{{ wating }} &#8381;</h2>
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

      <suspense-area :key="`${filterSignature}-${current}`" v-if="current != null" />

    </OfficeLayout>
</template>

<style scoped>
.transactions{
  min-width: 150px;
}
</style>
