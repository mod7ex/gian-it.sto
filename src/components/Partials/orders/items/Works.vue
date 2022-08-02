<script setup>
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/orders/work';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter';
import service from '~/services/orders/work';

const { render } = service();

const { route } = useAppRouter()

const { drop } = useConfirmDialog();

const { load, state, drop: dropWork } = store;

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
    :fields="fields"
    :items="state.raw"
    @delete="(id) => drop(() => dropWork(id))"
    @edit="(id) => render(id)"
  >
      <!-- Body -->

      <template #td-name="{ item }" >
        <Badge :point="true" color="blue" class="text-sm">{{ item.name }}</Badge>
      </template>

      <template #td-sum="{ value }" >
        {{ value ?? '_' }} ₽
      </template>

      <template #td-user="{ value }" >
        <Avatar
          :title="`${value.name} ${value.surname}`"
          :subtitle="value.office_position"
          :image="value.avatar"
        />
      </template>

      <template #td-time="{ value }" >
        {{ `${value} Ч` ?? '_' }}
      </template>

      <template #td-comments="{ value }" >
        {{ value ?? '_' }}
      </template>

      <!-- ****** -->
  </Table>
</template>
