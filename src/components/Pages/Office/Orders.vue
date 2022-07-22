<script setup>
import { PlusCircleIcon, ViewBoardsIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import Header from '@/UI/Header.vue';
import KanBan from '~/components/Partials/orders/items/KanBan.vue';
import useSuspense from '~/composables/useSuspense';
import departmentStore from '~/store/departments';

const { current } = departmentStore;
const SuspenseArea = useSuspense(KanBan);

</script>

<template>
  <OfficeLayout title="Заказ-наряды">

    <template #actions>
      <Button type="secondary" link="/pipelines">
        <ViewBoardsIcon class="w-5 h-5 mr-1"/>Воронка
      </Button>

      <Button color="blue" link="/orders/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <Header>Фильтр</Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end">
      <Input label="Название"/>

      <Input label="Дата от" type="date" />
      <Input label="Дата до" type="date" />

      <div>
        <Select
          label="Исполнитель"
          :options="[{label: 'Не выбрано', value: null}]"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Тип"
          :options="[{label: 'Не выбрано', value: null}]"
          class="w-44"
        />
      </div>
    </div>

    <suspense-area :key="`orders-${current}`" />

  </OfficeLayout>
</template>
