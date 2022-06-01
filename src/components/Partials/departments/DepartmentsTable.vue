<script setup>
import Link from '@/UI/Link.vue';
// import Badge from "@/UI/Badge.vue";
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import departmentForm from '~/services/departments/form.js';

import store from '~/store/departments';

import Table from '@/Layout/Table.vue';

const { load, drop: dropDepartment, departments } = store;

const { setModalVisibility } = departmentForm();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  // { label: 'Дата создания', key: 'created_at' },
];

await load();

</script>

<template>

  <Table
      :fields="fields"
      :items="departments"
      @delete="(id) => drop(() => dropDepartment(id))"
      @edit="(id) => setModalVisibility(true, id)"
  >

      <!-- Body -->
      <template #td-name="{ value, item: {id} }" >
          <Link @click="() => setModalVisibility(true, id)">{{ value }} </Link>
      </template>

      <!--
        <template #td-created_at="{ value }" >
            <Badge :point="true" color="blue" >{{ value }}</Badge>
        </template>
      -->
      <!-- ****** -->
  </Table>

</template>
