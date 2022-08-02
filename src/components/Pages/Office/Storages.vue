<script setup>
import { PlusCircleIcon, CogIcon, BellIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/storage/Table.vue';
import form from '~/services/storage/form';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { render } = form();

const SuspenseTable = useSuspense(Table);

const show = ref(false);

</script>

<template>
    <OfficeLayout title="Все склады" @click="show = false">
      <template #actions>
        <Button type="secondary" :link="{ name: 'StorageRequests' }">
          <BellIcon class="w-5 h-5 mr-1"/>Запрошенные запчасти
        </Button>

        <Button type="secondary" :link="{ name: 'Producers' }">
          <CogIcon class="w-5 h-5 mr-1"/>Производители
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <suspense-table loadingMsg="получаем складов..." v-if="current" :key="`dep-${current}`" />

    </OfficeLayout>
</template>

<style scoped>
/*
#sto-requests {
  width: 400px;
  min-height: 100px;
}
*/

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.request-slide-enter-active {
  transition: all .3s ease-out;
}

.request-slide-leave-active {
  transition: all .2s cubic-bezier(1, 0.5, 0.8, 1);
}

.request-slide-enter-from,
.request-slide-leave-to {
  /* transform: translateY(-100px); */
  opacity: 0;
}
</style>
