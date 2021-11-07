<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';
const cars = [
  {
    id: 1,
    vin: '1213123',
    number: 'р 145 ка 61',
    client: 'Иванов Иван Иванович',
    auto: 'Skoda Rapid',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    vin: '1213123',
    number: 'р 145 ка 61',
    client: 'Иванов Иван Иванович',
    auto: 'Skoda Rapid',
    created_at: '15.10.2020',
  },
  {
    id: 1,
    vin: '1213123',
    number: 'р 145 ка 61',
    client: 'Иванов Иван Иванович',
    auto: 'Skoda Rapid',
    created_at: '15.10.2020',
  },
];
</script>

<template>
  <!-- Table -->
  <Table>
    <THead>
    <Tr>
      <Th>Вин номер</Th>
      <Th>Гос. номер</Th>
      <Th>Владелец</Th>
      <Th>Автомобиль</Th>
      <Th class="text-center">Действия</Th>
    </Tr>
    </THead>
    <TBody>
    <Tr v-for="(car, index) in cars" :key="car.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
      <Td>
        <Link href="/cars/create">
          {{ car.vin }}
        </Link>
      </Td>
      <Td>
        {{ car.number }}
      </Td>
      <Td>
        <Link href="/cars/create">
          {{ car.client }}
        </Link>
      </Td>
      <Td>
        {{ car.auto }}
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
</template>

<style scoped>

</style>
