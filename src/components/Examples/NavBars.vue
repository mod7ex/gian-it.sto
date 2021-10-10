<script setup>
import NavBar from './../UI/NavBar.vue';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/vue/outline';

const items = [
  { name: 'Дашборд', href: '#', icon: HomeIcon, current: true },
  { name: 'Команда', href: '#', icon: UsersIcon, current: false },
  { name: 'Проекты', href: '#', icon: FolderIcon, current: false },
  { name: 'Календарь', href: '#', icon: CalendarIcon, current: false },
  { name: 'Документы', href: '#', icon: InboxIcon, current: false },
  { name: 'Отчёты', href: '#', icon: ChartBarIcon, current: false },
];
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Меню</h2>
  <NavBar :items="items" />
</template>

<style scoped>

</style>
