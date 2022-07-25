<script setup>
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/orders/work';
import useAppRouter from '~/composables/useAppRouter';

const { route } = useAppRouter()

const { drop } = useConfirmDialog();

const { load, state } = store;

const fields = [{ label: 'Название', key: 'name' }];

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

      <template #td-id="{ item }" >
        <Badge :point="true" color="blue" class="text-sm">{{ item.name }}</Badge>
      </template>
<!--
      <template #td-view="{ item }" >
        <Link @click="toVisualize = item">Посмотреть</Link>
      </template>

      <template #td-drop="{ item }" >
        <Link @click="() => handleDocToggle(item, true)">Удалить</Link>
      </template>
-->

      <!-- ****** -->
  </Table>
</template>
