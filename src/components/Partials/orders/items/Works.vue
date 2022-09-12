<script setup>
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import Avatar from '@/UI/Avatar.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/work';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter';
import service from '~/services/orders/work';
import { setOrder } from '~/services/orders/form';
import { computed } from '@vue/reactivity';

const { render } = service();

const { route } = useAppRouter();

const { drop } = useConfirmDialog();

const { load, state, drop: dropWork } = store;

const dropWorkThenSet = async (v) => {
  const result = await dropWork(v);
  try {
    return result;
  } finally {
    await setOrder(route.params.id);
  }
};

const fields = [
  { label: 'Вид работы', key: 'name' },
  { label: 'Исполнитель', key: 'user' },
  { label: 'Сумма', key: 'sum' },
  { label: 'Время', key: 'time' },
  { label: 'Комментарии', key: 'comments' },
];

await load({order_id :route.params.id});

</script>

<template>
  <Table
    :key="state.raw.length"
    :fields="fields"
    :items="state.raw"
    @delete="(id) => drop(() => dropWorkThenSet(id))"
    @edit="(id) => render(id)"
    :last="!!state.raw.length"
  >
      <!-- Body -->

      <template #td-name="{ value, item: { id } }" >
        <Link @click="() => render(id)">{{ value }}</Link>
      </template>

      <template #td-sum="{ value }" >
        {{ value ?? '_' }} ₽
      </template>

      <template #td-user="{ value }" >
        <Avatar
          :title="`${value.name ?? ''} ${value.middle_name ?? ''}`"
          :subtitle="value.office_position"
          :image="value.avatar"
        />
      </template>

      <template #td-time="{ value }" >
        {{ value ? `${value} Ч` : '_' }}
      </template>

      <template #td-comments="{ value }" >
        {{ value ?? '_' }}
      </template>

      <!-- ****** -->

      <!-- aditional row -->

      <template #td-last-name="{ }" >суммa</template>

      <template #td-last-sum="{ items }" >{{ items.reduce((prev, curr) => prev + (parseInt(curr.sum) || 0), 0) }} ₽</template>
  </Table>
</template>
