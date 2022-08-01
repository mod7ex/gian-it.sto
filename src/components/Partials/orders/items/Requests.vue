<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/storage-requests';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import service from '~/services/orders/storage-requests.js';
import index from '~/services/orders/form';
import { tasksColorMap } from '~/helpers/index';
import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter();

const { drop } = useConfirmDialog();
const { state, drop: dropRequest, load } = store;

const { render } = service();
const { fields } = index();

const cols = [
  { label: 'Товар', key: 'product' },
  // { label: 'Цена закупки (₽)', key: 'buy' },
  // { label: 'Цена продажи (₽)', key: 'sell' },
  { label: 'Kоличество', key: 'count' },
  { label: 'Комментарий', key: 'comment' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата добавления', key: 'created_at' },
];


await load({ order_id: route.params.id });

</script>

<template>
  <Table
      :fields="cols"
      :items="state.raw"
      @delete="(v) => drop(() => dropRequest(v))"
      @edit="(v) => render(v)"
  >
      <!-- Body -->
      <template #td-product="{ value, item: { id } }" >
          <Link @click="() => render(id)">{{ value?.name }}</Link>
      </template>

      <template #td-count="{ value }" >
          <span class="font-bold" >{{ value }}</span>
      </template>

      <template #td-comment="{ value }" > {{ value ?? '_' }} </template>

      <template #td-status="{ value }" >
          <Badge :point="true" :color="tasksColorMap[value]?.color">
              {{ tasksColorMap[value]?.label }}
          </Badge>
      </template>

      <template #td-created_at="{ value }" >
          {{ value?.split(' ')[0] }}
      </template>

      <!-- ****** -->
  </Table>
</template>
