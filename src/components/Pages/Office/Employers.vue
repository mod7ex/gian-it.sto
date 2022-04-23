<script setup>
import { ref, watch } from 'vue';
import _ from 'lodash';
import {
  SearchIcon,
  FilterIcon,
  PhoneIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/solid';
import { PlusCircleIcon } from '@heroicons/vue/outline';
import { useRouter } from 'vue-router';
import useApi from '~/composables/useApi.js';
import OfficeLayout from '@/Layout/Office.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import DialogModal from '@/UI/DialogModal.vue';
import Dialog from '@/UI/Dialog.vue';
import Spinner from '@/UI/Spinner.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import {
  DescriptionList,
  DescriptionListItems,
  DescriptionListItem,
} from '@/UI/DescriptionList';

import useConfirmDialog from '~/composables/useConfirmDialog.js';
import employers from '~/services/employers.js';

const { openConfirmDialog } = useConfirmDialog();

const { axiosInstance } = useApi();

const {
  users,
  directory,
  reOrder,
  orderkey,
  filter,
  order,
  usersNumber,
  selected,
  selectedUser,
  dropUser,
  setSelectedUser,
} = employers();

/* ************ Search ************ */
const search = ref('');

const isFetchingEmployers = ref(false);

watch(
  // watching search
  () => search.value,
  _.debounce(async (v) => {
    isFetchingEmployers.value = true;
    try {
      let url = `/users?order=${order.value.criteria}`;
      if (v) url += `&name=${v}`;
      const { data } = await axiosInstance.get(url);
      users.value = data.users;
      order.value.mod = -1; // return to desc(default) order mod
    } catch (e) {
      console.error('Error request', e);
    } finally {
      isFetchingEmployers.value = false;
    }
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
              <span v-if="usersNumber > 1">
                Искать среди {{ usersNumber }} сотрудников
              </span>
              <span v-else-if="usersNumber === 1">один пользователь!</span>
              <span v-else>нет пользователей!</span>
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
              <div class="text-gray-600" v-if="order.show && usersNumber > 1">
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

        <div
          class="flex flex-col items-center justify-center w-full"
          v-if="!selected"
        >
          <UserGroupIcon class="h-12 w-12 mx-auto text-gray-600" />

          <span class="mt-2 block text-sm font-medium text-gray-900">
            Выберите сотрудника
          </span>
        </div>

        <div
          class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          v-if="selected"
        >
          <article>
            <!-- Profile header -->
            <div
              class="border-b border-gray-200 flex justify-between px-4 sm:px-6 py-3 lg:items-end items-baseline lg:flex-row flex-col gap-2"
            >
              <div class="flex items-end">
                <img
                  :src="selectedUser.avatar ? selectedUser.avatar : ''"
                  alt=""
                  class="w-32 rounded-full"
                />

                <h1 class="text-2xl font-bold text-gray-900 truncate ml-2">
                  {{
                    selectedUser.name +
                    " " +
                    `${selectedUser.surname ? selectedUser.surname : ""}`
                  }}
                </h1>
              </div>

              <Button type="secondary" size="sm">
                <a
                  :href="`tel:${selectedUser.phone}`"
                  class="flex items-center"
                >
                  <PhoneIcon class="mr-2 h-5 w-5 text-gray-400" />
                  Позвонить
                </a>
              </Button>
            </div>

            <!-- Description list -->
            <DescriptionList
              :bordered="false"
              class="mt-5 mb-10"
              type="columns"
            >
              <DescriptionListItems type="columns">
                <DescriptionListItem
                  label="Телефон"
                  :value="selectedUser.phone"
                  type="columns"
                />
                <DescriptionListItem
                  label="Почта"
                  :value="selectedUser.email"
                  type="columns"
                />
                <DescriptionListItem
                  label="Город / Отдел"
                  :value="selectedUser.city"
                  type="columns"
                />
                <DescriptionListItem
                  label="Должность"
                  :value="selectedUser.position"
                  type="columns"
                />
                <DescriptionListItem
                  label="Задач в работе"
                  value="5"
                  type="columns"
                />
                <DescriptionListItem
                  label="Дата рождения"
                  :value="selectedUser.born_at"
                  type="columns"
                />
                <DescriptionListItem
                  label="О сотруднике"
                  type="columns"
                  columns="2"
                  :value="selectedUser.about"
                />
              </DescriptionListItems>
            </DescriptionList>

            <!-- Actions -->
            <div class="px-6 flex justify-between">
              <router-link
                :to="{ name: 'EditEmployer', params: { id: selectedUser.id } }"
              >
                <Button type="secondary" size="xs">
                  <PencilIcon class="mr-2 h-5 w-5 text-gray-400" />
                  Изменить
                </Button>
              </router-link>

              <Button
                size="xs"
                color="red"
                @click="
                  () =>
                    openConfirmDialog(
                      () => dropUser(selectedUser.id),
                      'are you sure you want to delete',
                      'delete ?'
                    )
                "
              >
                <TrashIcon class="mr-2 h-5 w-5 text-white" />
                Удалить
              </Button>
            </div>
          </article>
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
