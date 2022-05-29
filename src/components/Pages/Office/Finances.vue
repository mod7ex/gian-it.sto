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

import FinanceFormModal from '~/components/Partials/finances/Modal.vue';

const { setModalVisibility } = form();

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
        <Input label="Название"/>

        <div>
          <Label >Статус</Label>

          <ButtonGroup>
            <Button type="secondary" group="left" class="whitespace-nowrap">Приход</Button>
            <Button type="secondary" group="right" class="whitespace-nowrap">Расход</Button>
          </ButtonGroup>
        </div>

        <Input label="Дата от" type="date" />
        <Input label="Дата до" type="date" />

        <div>
          <Select
            label="Сортировать"
            :options="[{label: 'По дате создания', value: null}]"
            class="w-44"
          />
        </div>
      </div>

      <finance-form-modal @close="() => setModalVisibility(false)" />

      <SuspenseTable />

    </OfficeLayout>
</template>
