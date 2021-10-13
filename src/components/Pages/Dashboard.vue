<script setup>
import { SaveAsIcon, BadgeCheckIcon, CheckCircleIcon } from '@heroicons/vue/outline';
import StatGroup from '@/UI/StatGroup.vue';
import Stat from '@/UI/Stat.vue';
import Header from '@/UI/Header.vue';
import Avatar from '@/UI/Avatar.vue';
import AvatarGroup from '@/UI/AvatarGroup.vue';
import OfficeLayout from '@/Layout/Office.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';

const stats = [
  { id: 1, name: 'Новых заказ-нарядов', stat: '200', icon: SaveAsIcon, change: '20', changeType: 'increase', link: {label: 'Просмотреть', href: '#'} },
  { id: 2, name: 'Завершённых заказ-нарядов', stat: '20', icon: BadgeCheckIcon, change: '5', changeType: 'increase', link: {label: 'Просмотреть', href: '#'} },
  { id: 3, name: 'Закрытых задач', stat: '200', icon: CheckCircleIcon, change: '30', changeType: 'increase', link: {label: 'Просмотреть', href: '#'} },
];

const orders = [
  {
    department: 'Центр',
    city: 'Краснодар',
    color: 'yellow',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '20 марта 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
  {
    department: 'Центр',
    city: 'Ростов-на-Дону',
    color: 'green',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '15 сентября 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
  {
    department: 'Центр',
    city: 'Ростов-на-Дону',
    color: 'red',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '14 апреля 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
  {
    department: 'Центр',
    city: 'Ростов-на-Дону',
    color: 'purple',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '4 мая 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
  {
    department: 'Центр',
    city: 'Ростов-на-Дону',
    color: 'blue',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '8 января 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
  {
    department: 'Центр',
    city: 'Ростов-на-Дону',
    color: 'gray',
    user: {
      name: 'Шариков Игнат',
      phone: '+7 999 999-99-99',
      image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    updated: '26 июня 2022',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        image:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]
  },
];
</script>

<template>
  <OfficeLayout title="Главная страница">
    <StatGroup title="В этом месяце">
      <Stat v-for="stat in stats"
            :title="stat.name"
            :stat="stat.stat"
            :change="stat.change"
            :type="stat.changeType"
            :icon="stat.icon"
            :link="stat.link"
      />
    </StatGroup>

    <Header>
      Активные заказ-заказ наряды
    </Header>

    <Table class="mt-1">
      <THead>
      <Tr>
        <Th>Отдел</Th>
        <Th>Ответственный</Th>
        <Th>Участники</Th>
        <Th>Последнее обновление</Th>
      </Tr>
      </THead>
      <TBody>
      <Tr v-for="(order, index) in orders" :key="order.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
        <Td>
          <div class="flex items-center gap-1">
            <div :class="[`bg-${order.color}-500`, 'flex-shrink-0 w-2.5 h-2.5 rounded-full mr-1']" aria-hidden="true" />
            <span>{{ order.department }}</span>
            <span class="text-gray-500 font-normal">{{ order.city }}</span>
          </div>
        </Td>
        <Td>
          <Avatar
            :title="order.user.name"
            :subtitle="order.user.phone"
            :image="order.user.image"
          />
        </Td>
        <Td>
          <AvatarGroup :images="order.members.map(e => e.image)" />
        </Td>
        <Td>
          <span class="font-light text-sm text-gray-500 text-right">
            {{ order.updated }}
          </span>
        </Td>
      </Tr>
      </TBody>
    </Table>
  </OfficeLayout>
</template>

<style scoped>

</style>
