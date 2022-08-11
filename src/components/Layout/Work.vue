<script setup>
import { ref, onMounted, watch } from 'vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import { setTitle } from '~/lib/meta.js';
import Logo from '@/Partials/Logo.vue';
import Button from '@/UI/Button.vue';
import useAppRouter from '~/composables/useAppRouter';
import store from '~/store/departments';

const { setCurrent } = store;

onMounted(async () => {
  // Fix call rate
  if (!setCurrent.called_from_work) setCurrent(undefined, true);

  setCurrent.called_from_work = true;
});

const props = defineProps({
  title: { type: String, required: false },
});

const { isCurrentFullPath } = useAppRouter();

watch(() => props.title, (v) => setTitle(v));

const menu = [
  { label: 'Профиль', href: { name: 'WorkerProfile' } },
  { label: 'Задачи', href: { name: 'WorkerTasks' } },
  { label: 'Рабочее время', href: { name: 'WorkerTimes' } },
].map(({ label, href }) => ({ label, href, current: isCurrentFullPath({ name: href.name }) }));

const isShowMenu = ref(false);
</script>

<template>
  <div class="relative min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex px-2 lg:px-0">
            <div class="flex-shrink-0 flex items-center">
              <router-link class="h-14 w-auto" :to="{ name: 'Dashboard' }"><Logo /></router-link>
            </div>

            <nav aria-label="Global" class="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">
              <router-link
                v-for="(item,i) in menu"
                :key="i"
                :to="item.href"
                class="px-3 py-2 text-gray-900 text-sm"
                :class="{'font-medium': item.current}"
              >
                {{ item.label }}
              </router-link>
            </nav>
          </div>

          <div class="flex items-center lg:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false" @click="isShowMenu = !isShowMenu">
              <MenuIcon class="block h-6 w-6" />
            </button>
          </div>

          <!-- Mobile menu, show/hide based on mobile menu state. -->
          <div class="lg:hidden" v-if="isShowMenu">
            <div class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

            <div class="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top">
              <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                <div class="pt-3 pb-2">
                  <div class="flex items-center justify-between px-4">
                    <div class="flex-shrink-0 flex items-center">
                      <router-link class="h-14 w-auto" :to="{ name: 'Dashboard' }"><Logo /></router-link>
                    </div>
                    <div class="mr-2">
                      <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" @click="isShowMenu = false">
                        <XIcon class="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div class="mt-3 px-2 space-y-1">
                    <router-link v-for="(item, i) in menu"
                      :key="i"
                      :to="item.href"
                      class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      {{ item.label }}
                    </router-link>

                    <Button color="blue" :link="{ name: 'ChangeWorker' }">Завершить смену</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden lg:ml-4 lg:flex lg:items-center">
            <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <slot name="actions"></slot>

              <Button type="secondary" :link="{ name: 'ChangeWorker' }">
                Завершить смену
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="py-10">
      <div class="max-w-3xl lg:max-w-7xl mx-auto sm:px-6 px-2">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
