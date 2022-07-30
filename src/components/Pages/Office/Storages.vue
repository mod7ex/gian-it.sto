<script setup>
import { PlusCircleIcon, CogIcon, BellIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/storage/Table.vue';
import form from '~/services/storage/form';
import departmentStore from '~/store/departments';
import Requests from '@/Partials/storage/Requests.vue';
import Template from '~/components/Partials/orders/form/Raw/Template.vue';

const { current } = departmentStore;

const { render } = form();

const SuspenseTable = useSuspense(Table);
const SuspenseArea = useSuspense();

const show = ref(false);

</script>

<template>
    <OfficeLayout title="Все склады" @click="show = false">
      <template #actions>
        <div class="relative cursor-pointer">
          <BellIcon class="h-9 mr-1 border p-1 rounded-full shadow-md hover:bg-gray-100" @click.stop="() => { show = !show }"/>

          <Transition name="request-slide">

            <div @click.stop="() => {}" v-if="show" class="overflow-hidden absolute bg-white shadow-lg rounded-md z-30 sm:-right-1/2 top-11" id="sto-requests">
              <suspense-area > <Requests /> </suspense-area>
            </div>

          </Transition>
        </div>

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
#sto-requests {
  width: 400px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.request-slide-enter-active {
  transition: all .5s ease-out;
}

.request-slide-leave-active {
  transition: all .5s cubic-bezier(1, 0.5, 0.8, 1);
}

.request-slide-enter-from,
.request-slide-leave-to {
  /* transform: translateY(-100px); */
  height: 0;
  width: 0;
  opacity: 0;
}
</style>
