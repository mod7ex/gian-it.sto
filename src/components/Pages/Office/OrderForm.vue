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
  DotsHorizontalIcon,
  PlusCircleIcon,
  ChipIcon,
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
import Comments from '@/Partials/Comments.vue';
import Dropdown from '@/UI/Dropdown.vue';
import DescriptionLists from '@/Examples/DescriptionLists.vue';
import {MenuButton} from '@headlessui/vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table';
import {DescriptionList, DescriptionListItems, DescriptionListItem} from '@/UI/DescriptionList';

const editor = 'Текст задачи';

const microtasks = ref([
  {
    text: '',
  },
]);

const tasks = [
  {
    id: 1,
    user: {
      name: 'Иванов Иван',
      role: 'Турбинный цех',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    name: 'Разобрать турбину',
    created_at: '11.08.2021',
    deadline: '20.09.2021',
    status: 'В работе',
    order: 'Заказ наряд 1',
    pipeline: 'Турбинный цех',
    color: 'green',
  },
  {
    id: 2,
    user: {
      name: 'Петров Пётр',
      role: 'Бухгалтер',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    name: 'Предоставить отчёт за месяц',
    created_at: '20.05.2021',
    deadline: '21.06.2021',
    status: 'Ожидает',
    order: '',
    pipeline: '',
    color: 'yellow',
  },
  {
    id: 3,
    user: {
      name: 'Пушкова Светлана',
      role: 'Слесарный цех',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    name: 'Распилить дверь',
    created_at: '08.11.2021',
    deadline: '10.12.2021',
    status: 'Завершена',
    order: '',
    pipeline: '',
    color: 'purple',
  },
  {
    id: 4,
    user: {
      name: 'Фаустов Дмитрий',
      role: 'Менеджер',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    name: 'Принять работу',
    created_at: '22.12.2021',
    deadline: '28.12.2021',
    status: 'В работе',
    order: '',
    pipeline: '',
    color: 'green',
  },
];

const tabs = ref({
  form: {
    label: 'Форма',
    current: true,
    href: '#',
  },
  tasks: {
    label: 'Задачи',
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
  works: {
    label: 'Работы',
    current: false,
    href: '#',
  },
  diagnostic: {
    label: 'Диагностическая карта',
    current: false,
    href: '#',
  },
  comments: {
    label: 'Комментарии',
    current: false,
    href: '#',
  },
});

const order = ref({
  number: '#00001',
});
</script>

<template>
  <OfficeLayout title="Создание нового заказ наряда">
    <template #actions>
      <div class="mr-2 text-lg">
        Сумма: <span class="font-bold">100 000 ₽</span>
      </div>

      <Button type="secondary" link="/orders">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К заказ-нарядам
      </Button>

      <Button color="red">
        <XIcon class="w-5 h-5 mr-1"/>
        Удалить
      </Button>
    </template>

    <template #before>
      <Tabs v-model="tabs" class="px-3 sm:px-4 lg:px-5" />
    </template>

    <div v-show="tabs.form.current">
      <div class="mb-5">
        <Button color="blue">
          <CheckIcon class="w-5 h-5 mr-1"/>
          Сохранить
        </Button>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-3">
          <Input label="Номер заказ-наряда" :disabled="true" v-model="order.number" />
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

        <div class="col-span-12 sm:col-span-3">
          <Input label="Дата создания" type="datetime-local"/>
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Причина обращения" :options="[{label: 'Не выбрано'}]"/>
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Процесс" :options="[{label: 'Не выбрано'}]"/>
        </div>

        <div class="col-span-12 sm:col-span-3">
          <Select label="Воронка" :options="[{label: 'Не выбрано'}]"/>
        </div>

        <div class="col-span-12 sm:col-span-12">
          <TextArea label="Комментарий"/>
        </div>

        <div class="col-span-12 sm:col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Общий чек лист
          </label>
          <ul>
            <li v-for="(task, index) in microtasks" class="flex items-center mb-2">
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
    </div>

    <div v-if="tabs.tasks.current">
      <div class="mb-5">
        <Button color="blue" >
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Добавить задачу
        </Button>
      </div>
      <!-- Table -->
      <Table>
        <THead>
        <Tr>
          <Th>Название</Th>
          <Th>Ответственный</Th>
          <Th>Статус</Th>
          <Th>Дата создания</Th>
          <Th>Крайний срок</Th>
          <Th>Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr v-for="(task, index) in tasks" :key="task.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
          <Td>
            <Link to="/tasks/1">
              {{ task.name }}
            </Link>
          </Td>
          <Td>
            <Avatar
              :title="task.user.name"
              :subtitle="task.user.role"
              :image="task.user.image"
            />
          </Td>
          <Td>
            <Badge :point="true" :color="task.color">
              {{ task.status }}
            </Badge>
          </Td>
          <Td>{{ task.created_at }}</Td>
          <Td>{{ task.deadline }}</Td>
          <Td class="text-center">
            <Dropdown
              :items="[[{label: 'Изменить', click: '', icon: PencilIcon}, {label: 'Удалить', click: '', icon: XIcon}]]"
              direction="right"
              position="center"
            >
              <MenuButton>
                <Button type="secondary" :circle="true">
                  <DotsHorizontalIcon class="w-4 h-4" />
                </Button>
              </MenuButton>
            </Dropdown>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>

    <div v-if="tabs.comments.current">
      <Comments />
    </div>

    <div v-if="tabs.pays.current">
      <div class="mb-5">
        <Button color="blue">
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>
          Добавить оплату
        </Button>
      </div>
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

    <div v-if="tabs.works.current">
      <div class="mb-5">
        <Button color="blue">
          <ChipIcon class="w-5 h-5 mr-1"/>
          Добавить работу
        </Button>
      </div>
      <Table>
        <THead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Исполнитель</Th>
          <Th>Цена</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Снятие и установка турбокомпрессора
          </Td>
          <Td>
            <Avatar
              title="Василий Пупкин"
              subtitle="Турбинный цех"
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </Td>
          <Td>
            7 000 ₽
          </Td>
          <Td class="text-center">
            <Dropdown
              :items="[[{label: 'Изменить', click: '', icon: PencilIcon}, {label: 'Удалить', click: '', icon: XIcon}]]"
              direction="right"
              position="center"
            >
              <MenuButton>
                <Button type="secondary" :circle="true">
                  <DotsHorizontalIcon class="w-4 h-4" />
                </Button>
              </MenuButton>
            </Dropdown>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>

    <div v-if="tabs.docs.current">
      <div class="mb-5">
        <Button color="blue">
          <DocumentTextIcon class="w-5 h-5 mr-1"/>
          Добавить документ
        </Button>
      </div>

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
      <div class="mb-5">
        <Button color="blue">
          <CogIcon class="w-5 h-5 mr-1"/>
          Добавить запчасть
        </Button>
      </div>
      <Table>
        <THead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Дата добавления</Th>
          <Th>Базовая цена</Th>
          <Th>Текущая цена</Th>
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
            5 000 ₽
          </Td>
          <Td>
            7 000 ₽
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
            2 000 ₽
          </Td>
          <Td>
            5 000 ₽
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

    <div v-if="tabs.diagnostic.current" class="px-2">
      <div class="justify-between flex px-2">
        <Avatar
          title="Василий Пупкин"
          subtitle="Турбинный цех"
          image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />

        <div class="text-sm text-center">
          <div class="text-gray-500">Автомобиль</div>
          <div>Марка автомобиля</div>
        </div>

        <div class="text-right text-sm">
          <div class="text-gray-500">Дата заполнения</div>
          <div>11.07.2021 11:20</div>
        </div>
      </div>

      <div class="mt-5 border px-6">
        <div v-for="i in [1,2,3,4,5,6]" class="border-b py-8">
          <div class="font-bold text-lg">
            Жалоба на турбокомпрессор
          </div>

          <div class="my-3">
            <b>Ответ:</b> Нет мощности тяги
          </div>

          <div>
            <b>Рекомендация:</b>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi, consequuntur culpa deleniti dolore nulla possimus vel! At atque dolore eaque eligendi magnam mollitia nam numquam obcaecati quae, recusandae. Adipisci aliquam dignissimos dolorem et exercitationem expedita fuga, in ipsa iste laboriosam, magnam modi porro praesentium provident quasi quisquam velit?
          </div>
        </div>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
