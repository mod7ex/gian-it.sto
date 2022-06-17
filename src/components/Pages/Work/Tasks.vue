<script setup>
import Layout from '@/Layout/Work.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import Link from '@/UI/Link.vue';
import Select from '@/UI/Select.vue';
import Avatar from '@/UI/Avatar.vue';
import Badge from '@/UI/Badge.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

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
</script>

<template>
  <Layout title="Список задач">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="">
            <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Василий Пупкин</h1>
          <p class="text-sm font-medium text-gray-500">Работник <span class="text-gray-900">Слесарного цеха</span> начал смену в <time datetime="2020-08-25">9:00</time></p>
        </div>
      </div>
    </div>

    <Header>
      Задачи
    </Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end mt-4">
      <Input label="Название"/>

      <div>
        <Label class="mb-1">Статус</Label>
        <ButtonGroup>
          <Button type="secondary" group="left" class="whitespace-nowrap">
            В работе
          </Button>

          <Button type="secondary" group="right" class="whitespace-nowrap">
            Закрытые
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <Select label="Заказ-наряд"
                :options="[{label: 'Не выбрано', value: null}]"
                class="w-44"
        />
      </div>

      <div>
        <Select label="Сортировать"
                :options="[{label: 'По дате создания', value: null}]"
                class="w-44"
        />
      </div>
    </div>

    <Table class="mt-6">
      <THead>
      <Tr>
        <Th>Заказ-наряд</Th>
        <Th>Название</Th>
        <Th>Ответственный</Th>
        <Th>Статус</Th>
        <Th>Дата создания</Th>
        <Th>Крайний срок</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(task, index) in tasks" :key="task.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>#0001</Td>
        <Td>
          <Link to="/w/tasks/1">
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
      </Tr>
      </TBody>
    </Table>
  </Layout>
</template>
