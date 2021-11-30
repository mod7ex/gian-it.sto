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

const answers = ref([{}]);
</script>

<template>
  <OfficeLayout title="Создание вопроса">
    <template #actions>
      <Button type="secondary" link="/diagnostic-card">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        Вернуться
      </Button>

      <Button color="green">
        <CheckIcon class="w-5 h-5 mr-1" />
        Сохранить
      </Button>

      <Button color="red">
        <XIcon class="w-5 h-5 mr-1" />
        Удалить
      </Button>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-12">
        <Input label="Вопрос" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <div v-for="answer in answers" class="py-5 border-t border-dashed border-gray-400">
          <Input label="Ответ" />
          <TextArea label="Рекомендация" class="mt-2" />
        </div>

        <Button class="mt-2" @click="answers.push({})">
          Добавить
        </Button>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
