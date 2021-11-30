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
      <Button type="secondary" link="/cars">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К автомобилям
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
        <Select label="Владелец" :options="['Не выбран']" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Вин номер" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Гос номер" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Год выпуска" type="number" mask="####" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Марка" :options="['Не выбран']" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Модель" :options="['Не выбран']" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Input label="Кузов" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Двигатель" :options="['Не выбран']" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Топливо" :options="['Не выбран']" />
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Input label="Цвет" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <TextArea label="Примечание" />
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
