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

const tasks = ref([
  {
    text: ''
  }
]);
</script>

<template>
  <OfficeLayout title="Создание новой задачи">
    <template #actions>
      <Button type="secondary" link="/tasks">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К задачам
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
      <div class="col-span-12 sm:col-span-3">
        <Input label="Название задачи" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Input label="Крайний срок" type="datetime-local" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Исполнитель" :options="[{label: 'Не выбрано'}]" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Заказ наряд" :options="[{label: 'Не выбрано'}]" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <Wysiwyg v-model="editor" label="Текст задачи" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Чек лист
        </label>
        <ul>
          <li v-for="(task, index) in tasks" class="flex items-center mb-2">
            <span class="mr-2 w-5">{{ index + 1 }}</span>
            <Input v-model="task.text" rows="1" class="flex-grow" placeholder="Текст задачи" />
            <Button color="red" class="ml-2" size="sm" @click="delete tasks.splice(index, 1)">
              Удалить
            </Button>
          </li>
        </ul>
        <Button size="xs" class="mt-4" @click="tasks.push({text: ''})">
          Добавить
        </Button>
      </div>

      <div class="col-span-12 sm:col-span-12">
        <Upload />
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
