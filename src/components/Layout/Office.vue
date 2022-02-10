<script setup>
import {computed, ref} from 'vue';
import {MenuButton} from '@headlessui/vue';
import {
  ClockIcon,
  HomeIcon,
  ViewListIcon,
  MenuAlt1Icon,
  ChartBarIcon,
  UserGroupIcon,
  PuzzleIcon,
  PresentationChartLineIcon,
  ChipIcon,
  TableIcon,
  CogIcon,
  CurrencyDollarIcon,
  CollectionIcon,
} from '@heroicons/vue/outline';
import {SearchIcon, SelectorIcon} from '@heroicons/vue/solid';
import Avatar from '@/UI/Avatar.vue';
import Dropdown from '@/UI/Dropdown.vue';
import NavBar from '@/UI/NavBar.vue';
import SecondNavbar from '@/UI/SecondNavbar.vue';
import Input from '@/UI/Input.vue';
import Sidebar from '@/UI/Sidebar.vue';
import Logo from '@/Partials/Logo.vue';
import {setTitle} from '~/meta.js';
import { useRouter } from "vue-router";
import useApi from "../../composables/useApi"
import useAuth from "../../composables/useAuth";
const { axiosInstance } = useApi();
const { user, resetUser } = useAuth();
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  mainClasses: {
    type: String,
    required: false,
    default: 'flex-1 relative z-0 overflow-y-auto focus:outline-none'
  },
});

setTitle(props.title);

const sidebarOpen = ref(false);
const userMenu = [
  [{label: 'Профиль', href: '/profile'}],
  [{label: 'Выход', href: '/', click: () => {

  axiosInstance.post('auth/logout').catch(function(error){
    // Just out to console, because system need to be stable
    // and not stop when logout method returns something wrong
    console.error(error);
  })

    resetUser()
    router.push("/");
  }}],
];
const menu = [
  {label: 'Главная', href: '/dashboard', icon: PresentationChartLineIcon, current: false},
  {label: 'Заказ-наряды', href: '/orders', icon: ChipIcon, current: false},
  {label: 'Задачи', href: '/tasks', icon: TableIcon, current: false},
  {label: 'Рабочие процессы', href: '/processes', icon: PuzzleIcon, current: false},
  {label: 'Склад', href: '/storages', icon: CollectionIcon, current: false},
  {label: 'Клиенты', href: '/clients', icon: UserGroupIcon, current: false},
  {label: 'Сотрудники', href: '/employers', icon: UserGroupIcon, current: false},
  {label: 'Финансы', href: '/finances', icon: CurrencyDollarIcon, current: false},
  //{label: 'Настройки', href: '/settings', icon: CogIcon, current: false},
];

const departments = [
  {label: 'Ростов-на-Дону / Центр', href: '#', color: 'yellow'},
  {label: 'Ростов-на-Дону / Западный', href: '#', color: 'green'},
  {label: 'Краснодар / Центр', href: '#', color: 'indigo'},
];


const userFullName = computed(() => {
  const userData = user.value;

  if(userData.id) {
    return `${userData.name} ${userData.surname}`
  }
  return 'Гость';
});
</script>

<template>
  <div class="relative h-screen flex overflow-hidden bg-white">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false">
      <!-- Mobile logo -->
      <div class="flex-shrink-0 flex items-center px-4">
        <Logo class="h-8 w-auto" />
      </div>

      <!-- Mobile Nav -->
      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <NavBar :items="menu" class="px-2"/>
        <SecondNavbar :items="departments" title="Отделы" class="mt-8"/>
      </div>
    </Sidebar>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 pt-3 pb-4 bg-gray-100">
        <!-- Logo -->
        <div class="flex items-center justify-center flex-shrink-0 px-6">
          <Logo />
        </div>

        <!-- Sidebar -->
        <div class="h-0 flex-1 flex flex-col overflow-y-auto">
          <Dropdown :items="userMenu" direction="justify" class="px-3 mt-4">
            <MenuButton
              class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
              <span class="flex w-full justify-between items-center">
                <Avatar
                  image="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  :title="userFullName"
                  subtitle="Администратор"
                />

                <SelectorIcon class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
              </span>
            </MenuButton>
          </Dropdown>

          <!-- Sidebar Search -->
          <div class="px-3 mt-4">
            <Input placeholder="Поиск" :icon="SearchIcon"/>
          </div>

          <!-- Navigation -->
          <NavBar :items="menu" class="px-3 mt-6"/>
          <SecondNavbar :items="departments" title="Отделы" class="mt-8 px-3"/>
        </div>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Mobile -->
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
        <button type="button"
                class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                @click="sidebarOpen = true">
          <span class="sr-only">Открыть меню</span>
          <MenuAlt1Icon class="h-6 w-6" aria-hidden="true"/>
        </button>

        <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon class="h-5 w-5" aria-hidden="true"/>
                </div>
                <input
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                  placeholder="Поиск" type="search"/>
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <Dropdown :items="userMenu" direction="right" class="ml-3 relative">
              <MenuButton
                class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <img class="h-8 w-8 rounded-full"
                     src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt=""/>
              </MenuButton>
            </Dropdown>
          </div>
        </div>
      </div>

      <main :class="props.mainClasses">
        <!-- Page title & actions -->
        <div class="border-b border-gray-200 py-4 sm:flex sm:items-center sm:justify-between px-3 sm:px-4 lg:px-5">
          <div class="flex-1 min-w-0">
            <slot name="title">
              <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                {{ props.title }}
              </h1>
            </slot>
          </div>

          <div class="mt-4 flex sm:mt-0 sm:ml-4">
            <div class="flex flex-wrap gap-2 items-center">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>

        <slot name="before"></slot>

        <slot name="content">
          <div class="mt-6 px-3 mb-2 sm:px-4 lg:px-5">
            <slot></slot>
          </div>
        </slot>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
