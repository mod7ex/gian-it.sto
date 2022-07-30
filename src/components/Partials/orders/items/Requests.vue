<script setup>
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/storage-requests';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import service from '~/services/orders/storage-requests.js';
import { tasksColorMap } from '~/helpers/index';

const { drop } = useConfirmDialog();
const { state, drop: dropRequest } = store;

const { render } = service();

const fields = [
  { label: 'Наименование', key: 'name' },
  // { label: 'Цена закупки (₽)', key: 'buy' },
  // { label: 'Цена продажи (₽)', key: 'sell' },
  { label: 'Kоличество', key: 'sum' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата добавления', key: 'created_at' },
];

</script>

<template>
  <Table
      :fields="fields"
      :items="state.raw"
      @delete="(id) => drop(() => dropRequest(id))"
      @edit="(id) => render(id)"
  >
      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link @click="() => render(id)">{{ value }} </Link>
      </template>

      <template #td-sum="{ value }" >
          <span class="font-bold" >{{ value }}  ₽</span>
      </template>

      <template #td-comment="{ value }" > {{ value }} </template>

      <template #td-status="{ value }" >
          <Badge :point="true" :color="tasksColorMap[value].color">
              {{ tasksColorMap[value].label }}
          </Badge>
      </template>

      <template #td-created_at="{ value }" >
          {{ value?.split(' ')[0] }}
      </template>

      <!-- ****** -->
  </Table>
</template>
