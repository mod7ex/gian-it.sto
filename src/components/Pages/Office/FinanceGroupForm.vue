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
  <OfficeLayout title="Создание новой группы">
    <template #actions>
      <Button type="secondary" link="/finances-groups">
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
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
