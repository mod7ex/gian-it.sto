<script setup>
import Link from '@/UI/Link.vue';
// import Badge from "@/UI/Badge.vue";
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import departmentsService from '~/services/departments/departments.js';
import departmentForm from '~/services/departments/departmentForm.js';

import Table from '@/Layout/Table.vue';

const { setModalVisibility } = departmentForm();

const { fetchDepartments, dropDepartment, departments } = departmentsService();

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  // { label: 'Дата создания', key: 'created_at' },
];

await fetchDepartments();

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
