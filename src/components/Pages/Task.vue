<script setup>
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  PaperClipIcon,
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
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

const tasks = ref([
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit mollitia quasi reprehenderit tempore voluptates! Culpa cumque delectus deleniti dicta dolor ea eos eum facere',
    checked: true,
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. facere',
    checked: false,
  },
  {
    id: 3,
    text: 'Culpa cumque delectus deleniti dicta dolor ea eos eum facere harum incidunt ipsam magni molestias natus odit, pariatur quidem reiciendis repellendus, unde vero voluptatum. Aliquid cupiditate distinctio enim et magnam numquam odit rerum sunt totam, vitae',
    checked: false,
  },
  {
    id: 4,
    text: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
]);
</script>

<template>
  <OfficeLayout title="Название задачи">
    <template #actions>
      <Button type="secondary" link="/tasks">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К задачам
      </Button>

      <Button color="purple">
        <ClockIcon class="w-5 h-5 mr-1"/>
        Начать
      </Button>

      <Button color="green">
        <CheckIcon class="w-5 h-5 mr-1"/>
        Завершить
      </Button>

      <Button color="blue">
        <PencilIcon class="w-5 h-5 mr-1"/>
        Изменить
      </Button>
    </template>

    <Card>
      <template #header>
        <div class="flex gap-3 flex-wrap justify-between items-center">
          <Avatar
            title="Иван Шариков"
            subtitle="Менеджер"
            image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />

          <div class="text-right">
            <div class="text-sm flex items-center">
              <ClockIcon class="w-4 h-4 mr-1"/>
              <span class="mr-1">Крайний срок:</span>
              <span class="text-gray-500">
                17.07.2022 17:30
              </span>
            </div>

            <Badge :point="true" color="yellow">
              Выполняется
            </Badge>
          </div>
        </div>
      </template>

      <template #footer>
        <h2 class="font-bold">Прикреплённые файлы</h2>
        <ul class="mt-2">
          <li class="p-3 text-sm border rounded my-2" v-for="file in [{name: 'Название файла 1.docx'}, {name: 'Название файла 2.pptx'}, {name: 'Название файла 3.txt'}]">
            <Link class="flex items-center">
              <PaperClipIcon class="w-4 h-4 mr-1"/>
              <span>{{ file.name }}</span>
            </Link>
          </li>
        </ul>
      </template>

      <div>
        <h2 class="font-bold">Текст задачи</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <b>Incidunt</b> mollitia quasi reprehenderit tempore voluptates! Culpa cumque delectus deleniti dicta dolor ea eos eum facere <b>harum</b> incidunt ipsam magni molestias natus odit, pariatur quidem reiciendis repellendus, unde vero voluptatum. Aliquid cupiditate distinctio enim et magnam numquam odit rerum sunt totam, vitae? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt mollitia quasi reprehenderit tempore voluptates! Culpa cumque delectus deleniti dicta dolor ea eos eum facere harum incidunt ipsam magni molestias natus odit, pariatur quidem reiciendis repellendus, unde vero voluptatum. Aliquid cupiditate distinctio enim et magnam numquam odit rerum sunt totam, vitae</p>
      </div>

      <div class="mt-4">
        <h2 class="font-bold">Чек лист</h2>
        <ul>
          <li :class="['py-2', {'line-through': item.checked}]" v-for="item in tasks" :key="item.id">
            <Checkbox :label="item.text" v-model="item.checked" />
          </li>
        </ul>

        <span class="mt-4 text-sm text-gray-400">Выполнено: {{ tasks.filter(e => e.checked).length }} из {{ tasks.length }}</span>
      </div>
    </Card>
  </OfficeLayout>
</template>

<style scoped>

</style>
