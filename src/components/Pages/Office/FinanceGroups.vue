<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import Table from '@/Partials/finances/groups/Table.vue';
import form from '~/services/finances/groups/form';
import RawForm from '~/components/Partials/finances/groups/RawForm.vue';
import ModalForm from '@/Partials/ModalForm.vue';

const { setModalVisibility, saveForm, loading, errorMsg, success, ready, isModalUp, isUpdate } = form();

const SuspensFinanceGroupsTable = useSuspense(Table);

</script>

<template>
  <OfficeLayout title="Группы доходов / расходов">
    <template #actions>
      <Button type="secondary" :link="{name: 'Finances'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К финансам
      </Button>

      <Button color="blue" @click="() => setModalVisibility(true)">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <modal-form
      :loading="loading"
      :errorMsg="errorMsg"
      :success="success"
      :ready="ready"
      :open="isModalUp"
      @close="() => setModalVisibility(false)"
      @submited="()=>saveForm()"
    >
      <template #title>{{ `${isUpdate ? 'Oбновляете' : 'Создайте'} финансовая группа` }}</template>

      <template #form><raw-form /></template>
    </modal-form>

    <SuspensFinanceGroupsTable />

  </OfficeLayout>
</template>
