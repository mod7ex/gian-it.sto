<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import service from '~/services/roles/roles.js';
import store from '~/store/roles';
import Table from '@/Layout/Table.vue';

const { roles, load } = store;

const { movetoEditRolePage, dropRole } = service();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Дата создания', key: 'created_at' },
];

await load();

</script>

<template>
  <Table
      :fields="fields"
      :items="roles"
      @delete="(id) => drop(() => dropRole(id))"
      @edit="(id) => movetoEditRolePage(id)"
  >
      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link @click="()=>movetoEditRolePage(id)">{{ value }}</Link>
      </template>

      <template #td-created_at="{ value }" >
          {{ value }}
      </template>
      <!-- ****** -->
  </Table>
</template>
