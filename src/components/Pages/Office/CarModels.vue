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

const cars = [
  {name: 'AAA', mark: 'Audi'},
  {name: 'Polo', mark: 'Volkswagen'},
  {name: 'Rapid', mark: 'Skoda'},
];
</script>

<template>
  <OfficeLayout title="Модели автомобилей">
    <template #actions>
      <Button type="secondary" link="/cars">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        К автомобилям
      </Button>

      <Button color="blue" link="/car-models/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <Table>
      <THead>
      <Tr>
        <Th>Название</Th>
        <Th>Марка</Th>
        <Th class="text-center">Действия</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(car, index) in cars" :key="car.name" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <Link href="/car-models/create">
            {{ car.name }}
          </Link>
        </Td>
        <Td>
          {{ car.mark }}
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
