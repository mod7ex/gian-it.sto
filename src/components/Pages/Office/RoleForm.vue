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

const editor = 'Текст задачи';

const permission = ref([
  {
    label: 'Сотрудники',
    read: true,
    remove: true,
    create: true,
    update: true,
  },
  {
    label: 'Клиенты',
    read: true,
    remove: false,
    create: false,
    update: false,
  },
  {
    label: 'Задачи',
    read: true,
    remove: false,
    create: false,
    update: false,
  },
]);
</script>

<template>
  <OfficeLayout title="Создание новой роли">
    <template #actions>
      <Button type="secondary" link="/roles">
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

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input label="Название" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <div v-for="perm in permission" class="mb-4">
          <div>{{ perm.label }}</div>
          <div class="flex gap-6">
            <Toggle label="Просматривать" v-model="perm.read" />
            <Toggle label="Создавать" v-model="perm.create" />
            <Toggle label="Изменять" v-model="perm.update" />
            <Toggle label="Удалять" v-model="perm.remove" />
          </div>
        </div>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
