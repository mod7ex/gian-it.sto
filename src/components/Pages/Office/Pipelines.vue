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

const items = [
  {
    id: 1,
    name: 'Новый этап',
    color: 'red',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'В работе',
    color: '#cccccc',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'На согласовании',
    color: '#cccccc',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Успешно завершён',
    color: 'green',
    created_at: '15.10.2020',
  },
];
</script>

<template>
  <OfficeLayout title="Воронка">
    <template #actions>
      <Button type="secondary" link="/orders">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К заказ нарядам
      </Button>

      <Button color="blue" link="/pipelines/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <!-- Table -->
    <Table class="mt-5">
      <THead>
      <Tr>
        <Th>Название</Th>
        <Th>Цвет</Th>
        <Th>Дата создания</Th>
        <Th class="text-center">Действия</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(item, index) in items" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <Link href="/pipelines/create">
            {{ item.name }}
          </Link>
        </Td>
        <Td>
          <div class="w-5 h-5" :style="{background: item.color}"></div>
        </Td>
        <Td>
          {{ item.created_at }}
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
