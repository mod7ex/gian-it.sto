<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  QuestionMarkCircleIcon,
  MapIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table';

const processes = [
  {
    id: 1,
    name: 'Название процесса',
    count_tasks: 15,
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название процесса 2',
    count_tasks: 8,
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название процесса 3',
    count_tasks: 10,
    created_at: '15.10.2020',
  },
];
</script>

<template>
    <OfficeLayout title="Рабочие процессы">
      <template #actions>
        <Button type="secondary" link="/diagnostic-card">
          <MapIcon class="w-5 h-5 mr-1"/>
          Диагностическая карта
        </Button>

        <Button type="secondary" link="/why">
          <QuestionMarkCircleIcon class="w-5 h-5 mr-1"/>
          Причины обращения
        </Button>

        <Button color="blue" link="/processes/create">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>
          Создать
        </Button>
      </template>

      <!-- Table -->
      <Table class="mt-5">
        <THead>
        <Tr>
          <Th>Название</Th>
          <Th>Количество задач</Th>
          <Th>Дата создания</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr v-for="(process, index) in processes" :key="process.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
          <Td>
            <Link href="/processes/1">
              {{ process.name }}
            </Link>
          </Td>
          <Td>
            <Badge :point="true" color="blue">
              {{ process.count_tasks }} задач
            </Badge>
          </Td>
          <Td>
            {{ process.created_at }}
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
