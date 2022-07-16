<script setup>
import { PencilIcon, XIcon, DotsHorizontalIcon, PlusCircleIcon } from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import Button from '@/UI/Button.vue';
import Avatar from '@/UI/Avatar.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
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
  <div>
      <div class="mb-5">
        <Button color="blue" >
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить задачу
        </Button>
      </div>

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
</template>
