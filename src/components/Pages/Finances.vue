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
import Select from '@/UI/Select.vue';
import Input from '@/UI/Input.vue';
import Label from '@/UI/Label.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

const items = [
  {
    id: 1,
    name: 'Название операции',
    type: 'Приход',
    sum: '20 000',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название операции 2',
    type: 'Приход',
    sum: '5 000',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название операции 3',
    type: 'Приход',
    sum: '100 000',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название операции 4',
    type: 'Расход',
    sum: '16 000',
    created_at: '15.10.2020',
  },
];
</script>

<template>
    <OfficeLayout title="Финансы">
      <template #actions>
        <Button color="blue" link="/finances/create">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Добавить операцию
        </Button>
      </template>

      <!-- Filter -->
      <Header>
        Фильтр
      </Header>

      <div class="flex flex-wrap gap-2 items-end">
        <Input label="Название"/>

        <div>
          <Label class="mb-1">Статус</Label>
          <ButtonGroup>
            <Button type="secondary" group="left" class="whitespace-nowrap">
              Приход
            </Button>

            <Button type="secondary" group="right" class="whitespace-nowrap">
              Расход
            </Button>
          </ButtonGroup>
        </div>

        <Input label="Дата от" type="date" />
        <Input label="Дата до" type="date" />

        <div>
          <Select label="Сортировать"
                  :options="[{label: 'По дате создания', value: null}]"
                  class="w-44"
          />
        </div>
      </div>

      <Table class="mt-5">
        <THead>
        <Tr>
          <Th>Название</Th>
          <Th>Сумма</Th>
          <Th>Тип операции</Th>
          <Th>Дата создания</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr v-for="(item, index) in items" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
          <Td>
            <Link href="/finances/create">
              {{ item.name }}
            </Link>
          </Td>
          <Td class="font-bold">
            {{ item.sum }} ₽
          </Td>
          <Td>
            <Badge :point="true" :color="item.type === 'Приход' ? 'green' : 'red'">
              {{ item.type }}
            </Badge>
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
