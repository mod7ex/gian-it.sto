<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { MenuButton } from '@headlessui/vue';

import {
  CogIcon,
  UserGroupIcon,
  PuzzleIcon,
  PresentationChartLineIcon,
  ChipIcon,
  TableIcon,
  CurrencyDollarIcon,
  CollectionIcon,
  MenuAlt1Icon,
  OfficeBuildingIcon,
  LogoutIcon,
  UserIcon,
  TicketIcon,
} from '@heroicons/vue/outline';
import { SearchIcon, SelectorIcon } from '@heroicons/vue/solid';
import Avatar from '@/UI/Avatar.vue';
import Dropdown from '@/UI/Dropdown.vue';
import NavBar from '@/UI/NavBar.vue';
import SecondNavbar from '@/UI/SecondNavbar.vue';
import Input from '@/UI/Input.vue';
import Sidebar from '@/UI/Sidebar.vue';
import Logo from '@/Partials/Logo.vue';
import { setTitle } from '~/lib/meta.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useAuth from '~/composables/useAuth.js';
import { isRouteAccessableForCurrentUser } from '~/lib/permissions.js';
import store from '~/store/departments';

const { setCurrent, links, load } = store;

onMounted(async () => {
  if (!load.called_from_office) await load();
  if (!setCurrent.called_from_office) setCurrent();

  load.called_from_office = true;
  setCurrent.called_from_office = true;
});

const { user, logOut } = useAuth();
const { isCurrentFullPath, router } = useAppRouter();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  mainClasses: {
    type: String,
    required: false,
    default: 'flex-1 relative z-0 overflow-y-auto focus:outline-none',
  },
});

watch(() => props.title, (v) => setTitle(v));

const sidebarOpen = ref(false);

const userMenu = [
  [{ label: 'Профиль', name: 'Profile', icon: UserIcon }],
  [{ label: 'Работа', name: 'WorkerTasks', icon: TicketIcon }],
  [{ label: 'Выход', name: 'Login', click: () => logOut(router), icon: LogoutIcon }],
];

const menu = [
  // { label: 'Главная', name: 'Dashboard', icon: PresentationChartLineIcon },
  { label: 'Заказ-наряды', name: 'Orders', icon: ChipIcon },
  { label: 'Задачи', name: 'Tasks', icon: TableIcon },
  { label: 'Причины обращения', name: 'Why', icon: PuzzleIcon },
  { label: 'Склад', name: 'Storages', icon: CollectionIcon },
  { label: 'Клиенты', name: 'Clients', icon: UserGroupIcon },
  { label: 'Сотрудники', name: 'Employers', icon: UserGroupIcon },
  { label: 'Финансы', name: 'Finances', icon: CurrencyDollarIcon },
  // { label: 'Настройки', name: 'Settings', icon: CogIcon },
  { label: 'Отделы', name: 'Departments', icon: OfficeBuildingIcon },
].filter(({ name }) => isRouteAccessableForCurrentUser(name))
  .map(({ label, name, icon }) => ({ label, name, icon, current: isCurrentFullPath({ name }) }));

const userFullName = computed(() => {
  const userData = user.value;

  if (userData?.id) return `${userData.name ?? ''} ${userData.middle_name ?? ''}`;

  return 'Гость';
});

const userRoleTitle = computed(() => {
  const userData = user.value;

  if (userData?.roles[0]) return `${userData.roles[0].title}`;

  return 'Гость';
});
</script>

<template>
  <div class="relative h-screen flex overflow-hidden bg-white">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false">
      <!-- Mobile logo -->
      <div class="flex-shrink-0 flex items-center px-4 w-32 mx-auto logo-w">
        <Logo />
      </div>

      <!-- Mobile Nav -->
      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <NavBar :items="menu" />

        <v-can ability="crud departments">
          <SecondNavbar :key="`mobile-${links.lenght}`" :items="links" @switch="setCurrent" title="Отделы" class="mt-8" />
        </v-can>

      </div>
    </Sidebar>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 pt-3 pb-4 bg-gray-100">
        <!-- Logo -->
        <div class="flex items-center justify-center flex-shrink-0 px-6 h-20 w-30 mx-auto mb-4 logo-w"><Logo /></div>

        <!-- Sidebar -->
        <div class="h-0 flex-1 flex flex-col overflow-y-auto" id="sidebar-holder">
          <Dropdown :items="userMenu" direction="justify" class="px-3 mt-4">
            <MenuButton class="group w-full bg-gray-100 rounded-md pl-1 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500" >
              <span class="flex w-full justify-between items-center">
                <Avatar action :image="user.avatar" :title="userFullName" :subtitle="userRoleTitle" class="w-10/12 overflow-hidden" />
                <SelectorIcon class="h-5 text-gray-400 group-hover:text-gray-500 w-2/12" aria-hidden="true"/>
              </span>
            </MenuButton>
          </Dropdown>

          <!-- Sidebar Search -->
          <div class="px-3 mt-4">
            <Input placeholder="Поиск" :icon="SearchIcon" />
          </div>

          <!-- Navigation -->
          <NavBar :items="menu" class="px-3 my-4" />

          <v-can ability="crud departments">
            <SecondNavbar :key="`descktop-${links.lenght}`" :items="links" @switch="setCurrent" title="Отделы" class="mt-8 px-3" />
          </v-can>
        </div>
      </div>
    </div>

    <!-- Main column -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Mobile -->
      <div class="relative z-9 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Открыть меню</span>
          <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                  placeholder="Поиск"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <Dropdown :items="userMenu" direction="right" class="ml-3 relative">
              <MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <img class="h-8 w-8 rounded-full object-cover" :src="user.avatar"/>
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
  #sidebar-holder::-webkit-scrollbar {
    display: none;
  }

  .logo-w  {
    max-width: 130px;
  }
</style>
