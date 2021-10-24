<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import Link from '@/UI/Link.vue';
import Select from '@/UI/Select.vue';
import Avatar from '@/UI/Avatar.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

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
  <OfficeLayout title="Задачи">
    <template #actions>
      <Button color="blue" link="/tasks/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <Header>
      Фильтр
    </Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end">
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
        <Select label="Исполнитель"
                :options="[{label: 'Не выбрано', value: null}]"
                class="w-44"
        />
      </div>

      <div>
        <Select label="Заказ-наряд"
                :options="[{label: 'Не выбрано', value: null}]"
                class="w-44"
        />
      </div>

      <div>
        <Select label="Воронка"
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

    <!-- Table -->
    <Table class="mt-5">
      <THead>
      <Tr>
        <Th>Название</Th>
        <Th>Ответственный</Th>
        <Th>Статус</Th>
        <Th>Дата создания</Th>
        <Th>Крайний срок</Th>
        <Th>Заказ-наряд</Th>
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
          <Td>{{ task.order }}</Td>
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
  </OfficeLayout>
</template>

<style scoped>

</style>
