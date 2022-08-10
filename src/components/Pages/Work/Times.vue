<script setup>
import Layout from '@/Layout/Work.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import WorkerBadge from '~/components/Partials/WorkerBadge.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

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

    <worker-badge />

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
