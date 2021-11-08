<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

const storages = [
  {
    id: 1,
    name: 'Название склада',
    city: 'Краснодар',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название склада 2',
    city: 'Краснодар',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название склада 3',
    city: 'Краснодар',
    created_at: '15.10.2020',
  },
];
</script>

<template>
    <OfficeLayout title="Все склады">
      <template #actions>
        <Button type="secondary" link="/developers">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>
          Производители
        </Button>

        <Button color="blue" link="/storages/create">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Создать
        </Button>
      </template>

      <!-- Table -->
      <Table class="mt-5">
        <THead>
        <Tr>
          <Th>Название</Th>
          <Th>Город</Th>
          <Th>Дата создания</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr v-for="(storage, index) in storages" :key="storage.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
          <Td>
            <Link href="/storages/1">
              {{ storage.name }}
            </Link>
          </Td>
          <Td>
            {{ storage.city }}
          </Td>
          <Td>
            {{ storage.created_at }}
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
