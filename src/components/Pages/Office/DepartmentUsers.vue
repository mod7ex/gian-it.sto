<script setup>
import { computed, ref, watch } from 'vue';
import _ from 'lodash';
import OfficeLayout from '@/Layout/Office.vue';
import StackedListWithHeadings from '@/UI/StackedListWithHeadings.vue';
import EmployerPreview from '@/Partials/employers/Preview.vue';
import employers from '~/services/employers/employers.js';
import useAppRouter from '~/composables/useAppRouter.js';
import UEmployers from '@/Layout/users/Users.vue';

const { params, query } = useAppRouter();

const { order, directory, usersCount, selected, selectedUserId, setSelectedUser, fetchEmployers } = employers();

const EmployersFilter = order.comp(['department']);

const headingMessage = computed(() => {
  if (usersCount.value > 1) return `Искать среди ${usersCount.value} сотрудников`;
  if (usersCount.value === 1) return 'Oдин пользователь!';
  return 'нет пользователей!';
});

const search = ref('');

const loading = ref(false);
const loadEmployers = async () => {
  console.log(params.value);
  if (!params.value?.id) return;
  loading.value = true;
  await fetchEmployers(search.value, params.value.id);
  loading.value = false;
};

watch(search, _.debounce(loadEmployers, 1500), { /* 'immediate: true' <- we can't use immediate because of debounce it little slow */ });
watch(params, loadEmployers, { immediate: true });
</script>

<template>
  <OfficeLayout :title="'Сотрудники' + (query.name ? `${' в отделе ' + query.name}` : '')" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
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
