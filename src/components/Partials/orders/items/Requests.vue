<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/storage-requests';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import service from '~/services/orders/storage-requests.js';
import {setOrder} from '~/services/orders/form';
import { tasksColorMap } from '~/helpers/index';
import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter();

const { drop } = useConfirmDialog();
const { state, drop: dropRequest, load } = store;

const { render } = service();

const dropRequestThenSet = async (v) => {
  const result = await dropRequest(v);
  try {
    return result;
  } finally {
    await setOrder(route.params.id);
  }
};

const cols = [
  { label: 'Товар', key: 'product' },
  { label: 'Цена закупки (₽)', key: 'buy' },
  { label: 'Цена продажи (₽)', key: 'sell' },
  { label: 'Kоличество', key: 'count' },
  //   { label: 'Комментарий', key: 'comment' },
  { label: 'Статус', key: 'status' },
  { label: 'Дата добавления', key: 'created_at' },
];

await load({ order_id: route.params.id });

</script>

<template>
  <Table
    :fields="cols"
    :items="state.raw"
    @delete="(v) => drop(() => dropRequestThenSet(v))"
    @edit="(v) => render(v)"
    :noEdit="() => true"
    :last="!!state.raw.length"
  >
      <!-- Body -->
      <template #td-product="{ value }" >
          <Link :disabled="true" >{{ value?.name }}</Link>
      </template>

      <template #td-count="{ value }" >
          <span class="font-bold" >{{ value }}</span>
      </template>

      <template #td-buy="{ item: { product } }" >
          <span class="font-bold" >{{ product?.input_sum }} ₽</span>
      </template>

      <template #td-sell="{ item: { product } }" >
          <span class="font-bold" >{{ product?.output_sum }} ₽</span>
      </template>

      <!-- <template #td-comment="{ value }" > {{ value ?? '_' }} </template> -->

      <template #td-status="{ value }" >
          <Badge :point="true" :color="tasksColorMap[value]?.color">
              {{ tasksColorMap[value]?.label }}
          </Badge>
      </template>

      <template #td-created_at="{ value }" >
          {{ value?.split(' ')[0] }}
      </template>

      <!-- ****** -->

      <!-- aditional row -->

      <template #td-last-product="{ }" >суммa</template>

      <template #td-last-buy="{ items }" >{{ items.reduce((prev, curr) => prev + ((curr.product.input_sum ?? 0) * curr.count), 0) }} ₽</template>
      
      <template #td-last-sell="{ items }" >{{ items.reduce((prev, curr) => prev + ((curr.product.output_sum ?? 0) * curr.count), 0) }} ₽</template>

  </Table>
</template>


 