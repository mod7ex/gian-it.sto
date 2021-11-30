<script setup>
import Layout from '@/Layout/Work.vue';
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
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table';

const items = [
  {
    id: 1,
    date: '20.09.2021',
    workTime: '8 часов',
    countTasks: '6',
  },
  {
    id: 2,
    date: '21.09.2021',
    workTime: '8 часов 10 минут',
    countTasks: '7',
  },
  {
    id: 3,
    date: '22.09.2021',
    workTime: '7 часов',
    countTasks: '4',
  },
];
</script>

<template>
  <Layout title="Рабочее время">
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
      Рабочее время
    </Header>

    <div class="flex flex-wrap gap-2 items-end mt-4">
      <Input label="Дата от" type="date" />
      <Input label="Дата до" type="date" />
    </div>

    <Table class="mt-6">
      <THead>
      <Tr>
        <Th>Дата</Th>
        <Th>Количество отработанного времени</Th>
        <Th>Количество закрытых задач</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(item, index) in items" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>{{ item.date }}</Td>
        <Td>{{ item.workTime }}</Td>
        <Td>{{ item.countTasks }}</Td>
      </Tr>
      </TBody>
    </Table>
  </Layout>
</template>

<style scoped>

</style>
