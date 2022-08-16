<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Form from '@/Partials/processes/DcFormFields.vue';
import service from '~/services/processes/dk-form';
import useAppRouter from '~/composables/useAppRouter';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { route, back } = useAppRouter();

const { isEditPage, saveDk, dropDk } = service(route.params.id);

const SuspenseArea = useSuspense(Form);

</script>

<template>
  <OfficeLayout :title="isEditPage ? 'Обновление задачи' : 'Создание новой задачи'">
    <template #actions>
      <Button type="secondary" @click="back">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К задачам процесса
      </Button>

      <Button color="green" @click="saveDk">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <Button color="red" v-if="isEditPage" @click="() => drop(() => dropDk(route.params.task))">
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-area />

  </OfficeLayout>
</template>
