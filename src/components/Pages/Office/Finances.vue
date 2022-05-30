<script setup>
import { PlusCircleIcon, CollectionIcon } from '@heroicons/vue/outline';
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
import ModalForm from '@/Partials/ModalForm.vue';
import RawForm from '~/components/Partials/finances/RawForm.vue';

const { setModalVisibility, saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = form();
const { filter, order, filterSignature } = service();

const { criteriaOptions, criteria } = order;

const SuspenseTable = useSuspense(Table);

</script>

<template>
    <OfficeLayout title="Финансы">
      <template #actions>
        <Button type="secondary" :link="{name: 'FinanceGroups'}">
          <CollectionIcon class="w-5 h-5 mr-1"/>Группы
        </Button>

        <Button color="blue" @click="() => setModalVisibility(true)">
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
      </div>

      <modal-form
        :loading="loading"
        :errorMsg="errorMsg"
        :success="success"
        :ready="ready"
        :open="isModalUp"
        @close="() => setModalVisibility(false)"
        @submited="()=>saveForm()"
      >
        <template #title>{{ `${isUpdate ? 'Oбновляете' : 'Создайте'} финансовая сделка` }}</template>

        <template #form><raw-form /></template>
      </modal-form>

      <SuspenseTable :key="filterSignature"/>

    </OfficeLayout>
</template>
