<script setup>
import {
  CheckIcon,
  ArrowLeftIcon
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import List from '@/UI/List.vue';
import Select from '@/UI/Select.vue';

const toggles = ref([
  false,
  false
]);

const avatar = ref('https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=SjPZjUxoVh&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80');

const log = (event) => avatar.value = window.URL.createObjectURL(event.target.files[0]);
</script>

<template>
    <OfficeLayout title="Создание нового сотрудника">
      <template #actions>
        <Button type="secondary" link="/employers">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>
          Вернуться
        </Button>

        <Button color="green">
          <CheckIcon class="w-5 h-5 mr-1"/>
          Сохранить
        </Button>
      </template>

      <div class="flex flex-col lg:flex-row">
        <UploadImage @selected="log" :image="avatar" label="Фото" class="mb-3" />

        <div class="flex-grow space-y-6">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-4">
              <Input label="Фамилия" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Имя" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Отчество" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Почта" type="email" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Телефон" mask="+7 ### ###-##-##" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Новый пароль" type="password" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Подтвердите новый пароль" type="password" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 sm:col-span-4">
          <Input label="Дата рождения" type="date" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Input label="Должность" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Select label="Роль" />
        </div>

        <div class="col-span-12">
          <TextArea label="О сотруднике"  rows="3" />
        </div>
      </div>
    </OfficeLayout>
</template>

<style scoped>

</style>
