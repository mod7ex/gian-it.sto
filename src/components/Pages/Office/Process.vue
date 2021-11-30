<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table';

const tasks = [
  {
    id: 1,
    name: 'Название задачи процесса',
    pipeline: 'Новый этап',
    order: 1,
    user: 'Менеджер',
    created_at: '11.10.2020',
    color: 'red',
  },
  {
    id: 1,
    name: 'Название задачи 2 процесса',
    pipeline: 'Слесарный цех',
    order: 2,
    user: 'Работник слесарного цеха',
    created_at: '08.09.2020',
    color: 'indigo',
  },
  {
    id: 1,
    name: 'Название задачи 3 процесса',
    pipeline: 'Турбинный цех',
    order: 3,
    user: 'Работник турбинного цеха',
    created_at: '12.12.2021',
    color: 'yellow',
  },
];
</script>

<template>
  <OfficeLayout title="Название процесса / Список задач">
    <template #actions>
        <Button type="secondary" link="/processes">
            <ArrowLeftIcon class="w-5 h-5 mr-1"/>
            К списку процессов
        </Button>

        <Button color="blue" link="/processes/1/create">
            <PlusCircleIcon class="w-5 h-5 mr-1"/>
            Создать
        </Button>
    </template>

    <!-- Table -->
    <Table class="mt-5">
      <THead>
      <Tr>
        <Th>Название</Th>
        <Th>Воронка</Th>
        <Th>Дата создания</Th>
        <Th>Порядок</Th>
        <Th>Ответственная роль</Th>
        <Th class="text-center">Действия</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(task, index) in tasks" :key="task.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <Link>
            {{ task.name }}
          </Link>
        </Td>
        <Td>
          <Badge :point="true" :color="task.color">
            {{ task.pipeline }}
          </Badge>
        </Td>
        <Td>
          {{ task.created_at }}
        </Td>
        <Td>
          {{ task.order }}
        </Td>
        <Td>
          {{ task.user }}
        </Td>
        <Td class="text-center py-5">
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
