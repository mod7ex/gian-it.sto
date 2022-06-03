<script setup>
import Link from '@/UI/Link.vue';
// import Badge from "@/UI/Badge.vue";
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import form from '~/services/departments/form.js';

import store from '~/store/departments';

import Table from '@/Layout/Table.vue';

const { load, drop: dropDepartment, departments } = store;

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  // { label: 'Дата создания', key: 'created_at' },
];

const { render } = form();

await load();

</script>

<template>

  <Table
      :fields="fields"
      :items="departments"
      @delete="(id) => drop(() => dropDepartment(id))"
      @edit="(id) => render(id)"
  >

      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link @click="() => render(id)">{{ value }} </Link>
      </template>

      <!--
        <template #td-created_at="{ value }" >
            <Badge :point="true" color="blue" >{{ value }}</Badge>
        </template>
      -->
      <!-- ****** -->
  </Table>

</template>
