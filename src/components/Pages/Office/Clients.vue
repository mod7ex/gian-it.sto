<script setup>
import { onMounted, ref, watch } from 'vue';
import { PlusCircleIcon, CogIcon, RefreshIcon } from '@heroicons/vue/outline';
import { debounce, objectSignature } from '~/helpers';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Header from '@/UI/Header.vue';
import Select from '@/UI/Select.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import Table from '@/Partials/clients/Table.vue';
import useSuspense from '~/composables/useSuspense.js';
import service from '~/services/clients/clients';

const { filter, order, resetFilter, fetchClients, cleanUp } = service();

const { criteriaOptions } = order;

const SuspenseArea = useSuspense();

const filterSignature = ref('');

const setFilterSignature = () => {
  if (filter.department_id) {
    filterSignature.value = objectSignature(filter);
  }
};

watch(() => Reflect.deleteProperty({ ...filter }, 'department_id'), debounce(setFilterSignature), { deep: true });
watch(() => filter.department_id, setFilterSignature);

onMounted(cleanUp);

</script>

<template>
    <OfficeLayout title="Клиенты" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
      <template #actions>
        <v-can :ability="['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']">
          <Button type="secondary" :link="{name: 'Cars'}">
            <CogIcon class="w-5 h-5 mr-1" />Автомобили
          </Button>
        </v-can>

        <v-can ability="crud clients">
          <Button color="blue" :link="{name: 'ClientForm'}">
            <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
          </Button>
        </v-can>
      </template>

      <!-- Filter -->
      <Header>Фильтр</Header>

      <div class="flex flex-wrap gap-2 items-start">
        <Input label="Поиск" v-model="filter.search"/>

        <Input label="Имя" v-model="filter.name"/>

        <Input label="Номер машины" v-model="filter.number"/>

        <Select
          label="Сортировать"
          :options="criteriaOptions"
          v-model="filter.order"
          class="w-44"
        />

        <div class="text-center ml-5">
          <Label>сбросить</Label>
          <Button type="secondary" class="rounded-full" @click="()=>resetFilter()">
            <RefreshIcon class="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <suspense-area :key="filterSignature" >
        <Table @bottom-touched="()=>fetchClients()" />
      </suspense-area>

    </OfficeLayout>
</template>
