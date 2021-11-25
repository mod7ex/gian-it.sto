<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  QuestionMarkCircleIcon,
  CogIcon,
  PuzzleIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

const questions = [
  {
    id: 1,
    name: 'Название вопроса',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название вопроса 2',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    name: 'Название вопроса 3',
    created_at: '15.10.2020',
  },
];
</script>

<template>
  <OfficeLayout title="Диагностическая карта - вопросы">
    <template #actions>
      <Button type="secondary" link="/processes">
        <PuzzleIcon class="w-5 h-5 mr-1"/>
        К процессам
      </Button>

      <Button color="blue" link="/diagnostic-card/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <!-- Table -->
    <Table class="mt-5">
      <THead>
      <Tr>
        <Th>Название</Th>
        <Th>Создано</Th>
        <Th>Действия</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(question, index) in questions" :key="question.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <Link href="/diagnostic-card/create">
            {{ question.name }}
          </Link>
        </Td>
        <Td>
          {{ question.created_at }}
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
