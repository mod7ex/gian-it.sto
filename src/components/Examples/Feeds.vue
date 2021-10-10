<script setup>
import Feeds from './../UI/Feeds.vue';
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/vue/solid';

const timeline = [
  {
    id: 1,
    content: 'Поставлено',
    target: 'на Вася Пупкину',
    href: '#',
    date: '20 сентября',
    datetime: '22.10.2020',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Принято',
    target: 'Василием Пупкином',
    href: '#',
    date: '21 сентября',
    datetime: '2020-09-22',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: '1 этап завершён',
    target: 'Василием Пупкином',
    href: '#',
    date: '22 сентября',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Изменено',
    target: 'руководителем',
    href: '#',
    date: '25 сентября',
    datetime: '2020-09-30',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Завершено',
    target: 'Василием Пупкином',
    href: '#',
    date: '1 октября',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
];
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">История</h2>
  <Feeds :items="timeline" class="mt-5" />
</template>

<style scoped>

</style>
