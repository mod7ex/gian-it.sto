<script setup>
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/work';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter()

const { drop } = useConfirmDialog();

const { load, state } = store;

const fields = [
  { label: 'Вид работы', key: 'name' },
  { label: 'Сумма', key: 'sum' },
  { label: 'Время', key: 'time' },
  { label: 'Комментарии', key: 'comments' },
];

await load({order_id :route.params.id});

</script>

<template>
  <Table
    :fields="fields"
    :items="state.raw"
    @delete="(id) => drop(() => void(id))"
    @edit="(id) => void(id)"
  >
      <!-- Body -->

      <template #td-name="{ item }" >
        <Badge :point="true" color="blue" class="text-sm">{{ item.name }}</Badge>
      </template>

      <template #td-sum="{ value }" >
        {{ value ?? '_' }}
      </template>

      <template #td-time="{ value }" >
        {{ value ?? '_' }}
      </template>

      <template #td-comments="{ value }" >
        {{ value ?? '_' }}
      </template>

      <!-- ****** -->
  </Table>
</template>
