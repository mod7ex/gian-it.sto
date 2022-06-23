<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import service from '~/services/processes/diagnostic-card-form';
import useSuspense from '~/composables/useSuspense';
import Form from '@/Partials/processes/DiagnosticCardForm.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const SuspenseArea = useSuspense(Form);

const { saveForm, isUpdate, dropQuestion } = service();

</script>

<template>
  <OfficeLayout :title="isUpdate ? 'Обновить вопрос' : 'Создать вопрос'">
    <template #actions>
      <Button type="secondary" :link="{ name: 'DiagnosticCard' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />Вернуться
      </Button>

      <Button color="green" @click="()=>saveForm()">
        <CheckIcon class="w-5 h-5 mr-1" />Сохранить
      </Button>

      <Button
        color="red"
        v-if="isUpdate"
        @click="() => drop(dropQuestion)"
      >
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-area />
  </OfficeLayout>
</template>
