<script setup>
import {
  PlusCircleIcon,
  SaveAsIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  ArrowLeftIcon,
  ViewListIcon,
  ViewGridIcon,
} from '@heroicons/vue/outline';
import {
  PlusIcon,
  PencilIcon as PencilSolidIcon,
} from '@heroicons/vue/solid';
import { ref } from 'vue';
import { MenuButton } from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import ButtonGroup from '@/UI/ButtonGroup.vue';
import Avatar from '@/UI/Avatar.vue';
import Dropdown from '@/UI/Dropdown.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

const files = [
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: 'Название запчасти',
    count: '1',
    place: 'Место: 1.2',
    image:
      'https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
];

const show = ref(false);
const inStock = ref(true);
const grid = ref(true);
</script>

<template>
    <OfficeLayout title="Название склада" main-classes="flex-1 flex flex-col overflow-hidden">
      <template #actions>
        <Button type="secondary" link="/storages">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>
          Выбрать другой склад
        </Button>

        <Button color="blue">
          <SaveAsIcon class="w-5 h-5 mr-1"/>
          Приход
        </Button>

        <Button color="blue" link="/storages/1/create">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Добавить позицию
        </Button>
      </template>

      <template #content>
        <div class="flex-1 flex items-stretch overflow-hidden">
          <div class="flex-1 overflow-y-auto">
            <div class="justify-between flex px-3 lg:px-5 mt-4">
              <div class="flex">
                <ButtonGroup>
                  <Button
                    :type="inStock ? 'primary' : 'secondary'"
                    :key="inStock ? 'primary' : 'secondary'"
                    group="left"
                    @click="inStock = true"
                  >
                    В наличии
                  </Button>

                  <Button
                    :type="inStock ? 'secondary' : 'primary'"
                    :key="inStock ? 'secondary' : 'primary'"
                    group="right"
                    @click="inStock = false"
                  >
                    Нет в наличии
                  </Button>
                </ButtonGroup>
              </div>
              <div class="flex">
                <ButtonGroup>
                  <Button
                    :type="grid ? 'primary' : 'secondary'"
                    :key="grid ? 'primary' : 'secondary'"
                    group="left"
                    @click="grid = true"
                  >
                    <ViewGridIcon class="w-5 h-5 mr-1"/>
                  </Button>

                  <Button
                    :type="grid ? 'secondary' : 'primary'"
                    :key="grid ? 'secondary' : 'primary'"
                    group="right"
                    @click="grid = false"
                  >
                    <ViewListIcon class="w-5 h-5 mr-1"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div class="pt-5 px-3 lg:px-5">
              <div class="flex" v-if="grid">
                <ul role="list" class="w-full grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  <li v-for="file in files" :key="file.image" class="relative">
                    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">

                      <img :src="file.image" alt="" class="object-cover pointer-events-none group-hover:opacity-75" />

                      <button type="button" class="absolute inset-0 focus:outline-none" @click="show = true">
                        <span class="sr-only">Посмотреть {{ file.title }}</span>
                      </button>
                    </div>

                    <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{{ file.title }}</p>
                    <p class="block text-sm font-medium text-gray-500 pointer-events-none">В наличии: {{ file.count }}</p>
                    <p class="block text-sm font-medium text-gray-500 pointer-events-none">{{ file.place }}</p>
                  </li>
                </ul>
              </div>

              <Table v-if="!grid">
                <THead>
                <Tr>
                  <Th>Название</Th>
                  <Th>Количество</Th>
                  <Th>Место</Th>
                  <Th class="text-center">Действия</Th>
                </Tr>
                </THead>
                <TBody>
                <Tr v-for="(item, index) in files" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
                  <Td @click="show = true">
                    {{ item.title }}
                  </Td>
                  <Td>
                    {{ item.count }}
                  </Td>
                  <Td>
                    {{ item.place }}
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
            </div>
          </div>

          <aside v-if="show" class="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
            <div class="pb-16 space-y-6">
              <div>
                <div class="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1429772011165-0c2e054367b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="" class="object-cover">
                </div>
                <div class="mt-4 flex items-start justify-between">
                  <div>
                    <h2 class="text-lg font-medium text-gray-900">Название запчасти</h2>
                    <p class="text-sm font-medium text-gray-500">В наличии: 5 шт</p>
                    <p class="text-sm font-medium text-gray-500">Место 1.1</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Информация</h3>
                <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Добавил</dt>
                    <dd class="text-gray-900">Вася Пупкин</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Дата добавления</dt>
                    <dd class="text-gray-900">11.08.2020</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Дата изменения</dt>
                    <dd class="text-gray-900">12.09.2021</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Стоимость закупки</dt>
                    <dd class="text-gray-900">1024 ₽</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Стоимость продажи</dt>
                    <dd class="text-gray-900">2048 ₽</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Описание</h3>
                <div class="mt-2 flex items-center justify-between">
                  <p class="text-sm text-gray-500 italic">Добавить описание</p>
                  <button type="button" class="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <PencilSolidIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Запросили</h3>
                <ul class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  <li class="py-3 flex justify-between items-center">
                    <Avatar
                      image="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                      title="Вася Пупкин"
                    />

                    <button type="button" class="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Выдать</button>
                  </li>

                  <li class="py-3 flex justify-between items-center">
                    <Avatar
                      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=SjPZjUxoVh&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      title="Георгий Пласкунов"
                    />

                    <button type="button" class="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Выдать</button>
                  </li>

                  <li class="py-2 flex justify-between items-center">
                    <button type="button" class="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span class="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        <PlusIcon class="h-5 w-5" />
                      </span>

                      <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Добавить выдачу</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="flex justify-between block">
                <Button color="blue" class="flex-1 justify-center">
                  Изменить
                </Button>
                <Button color="red" class="flex-1 ml-3 justify-center">
                  Удалить
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </template>
    </OfficeLayout>
</template>

<style scoped>

</style>
