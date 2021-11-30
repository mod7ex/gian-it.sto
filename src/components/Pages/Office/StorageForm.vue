<script setup>
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  XIcon,
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Upload from '@/UI/Upload.vue';
import Card from '@/UI/Card.vue';
import Avatar from '@/UI/Avatar.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import List from '@/UI/List.vue';
import Select from '@/UI/Select.vue';

const image = ref('https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80');
</script>

<template>
  <OfficeLayout title="Добавление новой позиции на склад">
    <template #actions>
      <Button type="secondary" link="/storages/1">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        Вернуться
      </Button>

      <Button color="green">
        <CheckIcon class="w-5 h-5 mr-1"/>
        Сохранить
      </Button>

      <Button color="red">
        <XIcon class="w-5 h-5 mr-1"/>
        Удалить
      </Button>
    </template>

    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-96">
        <UploadImage :image="image" label="Фото" class="mb-3" :rounded="false" :full="true" />
      </div>

      <div class="flex-grow space-y-6">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-3">
            <Input label="Название" />
          </div>

          <div class="col-span-12 sm:col-span-3">
            <Input label="Количество" type="number" />
          </div>

          <div class="col-span-12 sm:col-span-3">
            <Input label="Артикул" />
          </div>

          <div class="col-span-12 sm:col-span-3">
            <Input label="Место на складе" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Select label="Производитель" :options="['Не выбрано']" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input label="Стоимость в закупке" type="number" />
          </div>

          <div class="col-span-12 sm:col-span-4">
            <Input label="Стоимость для реализации" type="number" />
          </div>

          <div class="col-span-12 sm:col-span-12">
            <TextArea label="Описание" rows="5" />
          </div>
        </div>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
