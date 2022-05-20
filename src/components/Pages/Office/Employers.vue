<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import * as _ from 'lodash';
import { UserGroupIcon } from '@heroicons/vue/solid';
import { PlusCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import EmployerPreview from '@/Partials/employers/Preview.vue';
import employers from '~/services/employers/employers.js';
import UEmployers from '@/Layout/users/Users.vue';

const { order, directory, usersCount, selected, setSelectedUser, fetchEmployers, selectedUserId, loading } = employers();

const EmployersFilter = order.comp(['department']);

const headingMessage = computed(() => {
  if (usersCount.value > 1) return `Искать среди ${usersCount.value} сотрудников`;
  if (usersCount.value === 1) return 'Oдин пользователь!';
  return 'нет пользователей!';
});

const search = ref('');

watch(search, _.debounce(fetchEmployers, 1500), { /* 'immediate: true' <- we can't use immediate because of debounce it little slow */ });

onMounted(async () => { await fetchEmployers(); });

</script>

<template>
  <OfficeLayout title="Сотрудники" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
    <template #actions>
      <v-can ability="crud roles">
        <Button type="secondary" :link="{name: 'Roles'}">
          <UserGroupIcon class="w-5 h-5 mr-1" />Роли
        </Button>
      </v-can>

      <v-can ability="crud users">
        <Button color="blue" :link="{name: 'EmployerForm'}">
          <PlusCircleIcon class="w-5 h-5 mr-1" />Создать
        </Button>
      </v-can>
    </template>

    <template #content>

      <u-employers
        @toggle-filter="order.active.value = usersCount > 1 && !order.active.value"
        selectText="Выберите сотрудника"
        :loading="loading"
        :message="headingMessage"
        :selected="selected"
        v-model="search"
      >

        <template #filter>
          <employers-filter />
        </template>

        <template #list>
          <StackedListWithHeadings
            class="flex-1 min-h-0 overflow-y-auto"
            :items="directory"
            @select="setSelectedUser"
            :key="order.key.value"
            :selected="selectedUserId"
          />
        </template>

        <template #preview>
          <employer-preview />
        </template>

      </u-employers>
    </template>
  </OfficeLayout>
</template>
