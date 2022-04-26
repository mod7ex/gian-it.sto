<script setup>
import { computed, ref, watch } from 'vue';
import _ from 'lodash';
import {
  SearchIcon,
  FilterIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/vue/solid';
import { PlusCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Input from '@/UI/Input.vue';
import Button from '@/UI/Button.vue';
import Spinner from '@/UI/Spinner.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import EmployerPreview from '@/Partials/EmployerPreview.vue';

import employers from '~/services/employers.js';

const {
  directory,
  reOrder,
  orderkey,
  filter,
  order,
  usersCount,
  selected,
  setSelectedUser,
  fetchEmployers,
} = employers();

/* ************ Search ************ */
const search = ref('');

const isFetchingEmployers = ref(false);

const headingMessage = computed(() => {
  if (usersCount.value > 1) return `Искать среди ${usersCount.value} сотрудников`;
  if (usersCount.value === 1) return 'Oдин пользователь!';
  return 'нет пользователей!';
});

watch(
  // watching search
  () => search.value,
  _.debounce(async (v) => {
    isFetchingEmployers.value = true;
    await fetchEmployers(v);
    isFetchingEmployers.value = false;
  }, 1500),
  {
    immediate: true,
  },
);
</script>

<template>
  <OfficeLayout
    title="Сотрудники"
    main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto"
  >
    <template #actions>
      <Button type="secondary" link="/roles">
        <UserGroupIcon class="w-5 h-5 mr-1" />
        Роли
      </Button>

      <Button color="blue" link="/employers/create">
        <PlusCircleIcon class="w-5 h-5 mr-1" />
        Создать
      </Button>
    </template>

    <template #content>
      <div
        class="flex-1 relative z-0 flex md:overflow-hidden overflow-visible flex-col md:flex-row"
      >
        <div
          class="order-2 md:order-first md:flex md:flex-col flex-shrink-0 w-96 border-r border-gray-200"
        >
          <div class="px-6 pt-6 pb-4">
            <h2 class="text-lg font-medium text-gray-900">Картотека</h2>

            <div v-if="isFetchingEmployers" class="mt-1">
              <Spinner h="4" w="4">
                <span class="text-sm text-gray-600">fetching user...</span>
              </Spinner>
            </div>

            <p class="my-1 text-sm text-gray-600" v-else>
              <span> {{ headingMessage }} </span>
            </p>

            <div class="mt-6 flex space-x-4 mb-3">
              <Input
                placeholder="Поиск"
                class="flex-grow"
                :icon="SearchIcon"
                v-model="search"
              />

              <Button type="secondary" @click="order.show = !order.show">
                <FilterIcon class="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            <Transition name="filter">
              <div class="text-gray-600" v-if="order.show && usersCount > 1">
                <div
                  class="py-2 px-4 border cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                  v-for="(item, i) in filter"
                  :key="i"
                  @click="reOrder(item.criteria)"
                >
                  <span>{{ item.label }}</span>
                  <component
                    v-if="order.criteria === item.criteria"
                    :is="order.mod === 1 ? ArrowUpIcon : ArrowDownIcon"
                    class="w-4 h-4 text-gray-400"
                  />
                </div>
              </div>
            </Transition>
          </div>

          <StackedListWithHeadings
            class="flex-1 min-h-0 overflow-y-auto"
            :items="directory"
            @select="setSelectedUser"
            :key="orderkey"
          />
        </div>

        <employer-preview v-if="selected" />

        <div class="flex flex-col items-center justify-center w-full" v-else>
          <UserGroupIcon class="h-12 w-12 mx-auto text-gray-600" />

          <span class="mt-2 block text-sm font-medium text-gray-900">
            Выберите сотрудника
          </span>
        </div>
      </div>
    </template>
  </OfficeLayout>
</template>

<style scoped>
.filter-enter-active {
  transition: all 1s ease;
}

.filter-leave-active,
.filter-enter-active {
  height: 7.85em;
}

.filter-enter-from {
  height: 0;
}

.filter-leave-active,
.filter-enter-from {
  opacity: 0;
  transition: all 1s ease;
}

.filter-leave-to {
  height: 0;
}
</style>
