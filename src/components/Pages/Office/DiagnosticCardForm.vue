<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon, EyeIcon, PencilIcon } from '@heroicons/vue/outline';
import { ref, onScopeDispose } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import service from '~/services/processes/diagnostic-card-form';
import useSuspense from '~/composables/useSuspense';
import VForm from '@/Partials/processes/DiagnosticCardForm.vue';
import Preview from '@/Partials/processes/DiagnosticCardPreview.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const SuspenseArea = useSuspense();

const { isUpdate, saveForm, dropDc, clearMemory } = service();

const previewing = ref(true);

onScopeDispose(clearMemory);

</script>

<template>
  <OfficeLayout :title="isUpdate ? 'Обновить вопрос' : 'Создать вопрос'">
    <template #actions>
      <Button type="secondary" :link="{ name: 'DiagnosticCard' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />Вернуться
      </Button>

      <Button color="blue" @click="previewing = !previewing">
        <component :is="previewing ? PencilIcon : EyeIcon" class="w-5 h-5 mr-1" /> {{ previewing ? 'Редактировать' : 'Предварительный просмотр' }}
      </Button>

      <Button color="green" @click="()=>saveForm()">
        <CheckIcon class="w-5 h-5 mr-1" />Сохранить
      </Button>

      <Button
        color="red"
        v-if="isUpdate"
        @click="() => drop(dropDc)"
      >
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <preview v-if="previewing" />

    <suspense-area v-else>
      <keep-alive><component :is="VForm" /></keep-alive>
    </suspense-area>

  </OfficeLayout>
</template>
