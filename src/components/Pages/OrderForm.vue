<script setup>
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  ArrowLeftIcon,
  XIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  CogIcon,
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Upload from '@/UI/Upload.vue';
import Tabs from '@/UI/Tabs.vue';
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
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

const editor = 'Текст задачи';

const tasks = ref([
  {
    text: '',
  },
]);

const tabs = ref({
  form: {
    label: 'Форма',
    current: true,
    href: '#',
  },
  comments: {
    label: 'Комментарии',
    current: false,
    href: '#',
  },
  pays: {
    label: 'Оплаты',
    current: false,
    href: '#',
  },
  docs: {
    label: 'Документы',
    current: false,
    href: '#',
  },
  storage: {
    label: 'Склад',
    current: false,
    href: '#',
  },
});

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
};
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4 дня назад',
    imageId: '1494790108377-be9c29b29330',
    body:
      'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4 дня назад',
    imageId: '1519244703995-f4e0f30006d5',
    body:
      'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4 дня назад',
    imageId: '1506794778202-cad84cf45f1d',
    body:
      'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
];
</script>

<template>
  <OfficeLayout title="Создание нового заказ наряда">
    <template #actions>
      <Button type="secondary" link="/orders">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К заказ-нарядам
      </Button>

      <Button color="gray">
        <CurrencyDollarIcon class="w-5 h-5 mr-1"/>
        Принять оплату
      </Button>

      <Button color="gray">
        <DocumentTextIcon class="w-5 h-5 mr-1"/>
        Выписать документ
      </Button>

      <Button color="gray">
        <CogIcon class="w-5 h-5 mr-1"/>
        Нужна запчасть
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

    <template #before>
      <Tabs v-model="tabs" class="px-3 sm:px-4 lg:px-5"/>
    </template>

    <div class="grid grid-cols-12 gap-6" v-if="tabs.form.current">
      <div class="col-span-12 sm:col-span-3">
        <Input label="Название заказ-наряда"/>
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Ответственный" :options="[{label: 'Не выбрано'}]"/>
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Клиент" :options="[{label: 'Не выбрано'}]"/>
      </div>

      <div class="col-span-12 sm:col-span-3">
        <Select label="Автомобиль" :options="[{label: 'Не выбрано'}]"/>
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Крайний срок" type="datetime-local"/>
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Процесс" :options="[{label: 'Не выбрано'}]"/>
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Воронка" :options="[{label: 'Не выбрано'}]"/>
      </div>

      <div class="col-span-12 sm:col-span-12">
        <Wysiwyg v-model="editor" label="Описание"/>
      </div>

      <div class="col-span-12 sm:col-span-12">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Общий чек лист
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
        <Upload/>
      </div>
    </div>

    <div v-if="tabs.comments.current">
      <section aria-labelledby="notes-title">
        <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
          <div class="divide-y divide-gray-200">
            <div class="px-4 py-5 sm:px-6">
              <h2 id="notes-title" class="text-lg font-medium text-gray-900">Комментарии / Заметки</h2>
            </div>
            <div class="px-4 py-6 sm:px-6">
              <ul role="list" class="space-y-8">
                <li v-for="comment in comments" :key="comment.id">
                  <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                      <img class="h-10 w-10 rounded-full" :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`" alt="" />
                    </div>
                    <div>
                      <div class="text-sm">
                        <a href="#" class="font-medium text-gray-900">{{ comment.name }}</a>
                      </div>
                      <div class="mt-1 text-sm text-gray-700">
                        <p>{{ comment.body }}</p>
                      </div>
                      <div class="mt-2 text-sm space-x-2">
                        <span class="text-gray-500 font-medium">{{ comment.date }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-6 sm:px-6">
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
              </div>
              <div class="min-w-0 flex-1">
                <form action="#">
                  <div>
                    <label for="comment" class="sr-only">Комментарий</label>
                    <TextArea placeholder="Текст вашего комментария..." rows="3" />
                  </div>
                  <div class="mt-3 flex items-center justify-between">
                    <span class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                      <QuestionMarkCircleIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />

                      <span>
                        Только текст, HTML запрещён
                      </span>
                    </span>
                    <Button color="purple">
                      Отправить
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="tabs.pays.current">
      <Table>
        <THead>
        <Tr>
          <Th>Плательщик</Th>
          <Th>Дата создания</Th>
          <Th>Способ оплаты</Th>
          <Th>Комментарий</Th>
          <Th>Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Иванов Иван Иванович
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            Терминал
          </Td>
          <Td>
            Преодоплата
          </Td>
          <Td>
            <Link>
              Посмотреть
            </Link>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>

    <div v-if="tabs.docs.current">
      <Table>
        <THead>
        <Tr>
          <Th>Документ</Th>
          <Th>Дата создания</Th>
          <Th>Комментарий</Th>
          <Th>Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Название
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Link>
              Посмотреть
            </Link>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>

    <div v-if="tabs.storage.current">
      <Table>
        <THead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Дата добавления</Th>
          <Th>Комментарий</Th>
          <Th>Статус</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Название запчасти <span class="text-gray-400">#2323</span>
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Badge :point="true" color="green">
              Выдал Иванов Иван 11.12.2022
            </Badge>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Название запчасти 2 <span class="text-gray-400">#12</span>
          </Td>
          <Td>
            03.12.2021
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Badge :point="true" color="yellow">
              Ожидает
            </Badge>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
