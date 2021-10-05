<script setup>
import {Table, THead, TBody, Tr, Td, Th} from './../UI/Table/index.js';
import Button from './../UI/Button.vue';
import ButtonGroup from './../UI/ButtonGroup.vue';
import Badge from './../UI/Badge.vue';

const people = [
  {
    name: 'Вася Пупкин',
    department: 'Руководство',
    status: 'Выключен',
    role: 'Администратор',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Пётр Трушкин',
    status: 'Активен',
    department: 'Финансовый отдел',
    role: 'Бухгалтер',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Дмитрий Попов',
    status: 'Активен',
    department: 'Слесарный цех',
    role: 'Техник',
    email: 'jane.cooper@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
];
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Таблицы</h2>
  <Table class="mt-5">
    <THead>
      <Tr>
        <Th>Имя</Th>
        <Th>Отдел</Th>
        <Th>Статус</Th>
        <Th>Роль</Th>
        <Th>Действия</Th>
      </Tr>
    </THead>
    <TBody>
      <Tr v-for="(person, index) in people" :key="person.email" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" :src="person.image" alt="" />
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">
                {{ person.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ person.email }}
              </div>
            </div>
          </div>
        </Td>
        <Td>
          {{ person.department }}
        </Td>
        <Td>
          <Badge :color="person.status === 'Выключен' ? 'red' : 'green'">
            {{ person.status }}
          </Badge>
        </Td>
        <Td>
          {{ person.role }}
        </Td>
        <Td>
          <ButtonGroup>
            <Button color="red" size="xs" group="left">
              Удалить
            </Button>

            <Button color="green" size="xs" group="right">
              Изменить
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
    </TBody>
  </Table>

  <Table class="mt-5">
    <THead>
      <Tr>
        <Th>Заголовок</Th>
        <Th>Заголовок</Th>
        <Th>Заголовок</Th>
      </Tr>
    </THead>
    <TBody>
      <Tr class="bg-white">
        <Td>Значение</Td>
        <Td>Значение</Td>
        <Td>Значение</Td>
      </Tr>
      <Tr class="bg-gray-100">
        <Td>Значение</Td>
        <Td>Значение</Td>
        <Td>Значение</Td>
      </Tr>
      <Tr class="bg-white">
        <Td>Значение</Td>
        <Td>Значение</Td>
        <Td>Значение</Td>
      </Tr>
    </TBody>
  </Table>
</template>

<style scoped>

</style>
