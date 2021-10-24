<script setup>
import {
  CheckIcon,
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import List from '@/UI/List.vue';

const toggles = ref([
  false,
  false
]);

const avatar = ref('https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=SjPZjUxoVh&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80');

const log = (event) => avatar.value = window.URL.createObjectURL(event.target.files[0]);
</script>

<template>
    <OfficeLayout title="Личные данные">
      <template #actions>
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
              <Input label="Телефон" />
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
        <div class="col-span-12 sm:col-span-6">
          <Input label="Дата рождения" type="date" />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input label="Должность" />
        </div>

        <div class="col-span-12">
          <TextArea label="О себе"  rows="3" />
        </div>
      </div>

      <div class="pt-6 divide-y divide-gray-200">
        <div>
          <List class="mt-2" :items="[
          {title: 'О себе', subtitle: 'Скрыть информацию о себе для других сотрудников'},
          {title: 'День рождения', subtitle: 'Скрыть день рождения для других сотрудников'}
        ]" title="Приватность" subtitle="Здесь вы можете настроить поведение приложения - то что хотели бы не показывать">
            <template v-slot:right="{item, index}">
              <Toggle v-model="toggles[index]" />
            </template>
          </List>
        </div>
      </div>
    </OfficeLayout>
</template>

<style scoped>

</style>
