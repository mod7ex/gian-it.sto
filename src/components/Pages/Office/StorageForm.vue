<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Form from '@/Partials/storage/products/Form.vue';
import useSuspense from '~/composables/useSuspense';
import form from '~/services/storage/products/form';

const SuspenseForm = useSuspense(Form);

const { previousPage, saveProduct, isEditProductPage, dropProduct } = form();

</script>

<template>
  <OfficeLayout :title="isEditProductPage ? 'Обновить позиции на склад' : 'Добавление новой позиции на склад'">
    <template #actions>
      <Button type="secondary" @click="() => previousPage()">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>Вернуться
      </Button>

      <Button color="green" @click="() => saveProduct()">
        <CheckIcon class="w-5 h-5 mr-1"/>Сохранить
      </Button>

      <Button color="red" v-if="isEditProductPage" @click="()=>dropProduct()">
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <suspense-form />

  </OfficeLayout>
</template>
