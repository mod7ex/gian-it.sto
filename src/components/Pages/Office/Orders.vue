<script setup>
import { PlusCircleIcon, ViewBoardsIcon } from '@heroicons/vue/outline';
import { watch, ref } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Header from '@/UI/Header.vue';
import KanBan from '~/components/Partials/orders/items/KanBan.vue';
import useSuspense from '~/composables/useSuspense';
import VFilter from '~/components/Partials/orders/items/Filter.vue';
import departmentStore from '~/store/departments';
import service from '~/services/orders';
import { debounce } from '~/helpers';

const { current } = departmentStore;

const { sig } = service();

const key = ref('random');

watch(sig, debounce(() => { key.value = Date.now(); }));

const SuspenseArea = useSuspense();

</script>

<template>
  <OfficeLayout title="Заказ-наряды">

    <template #actions>
      <Button type="secondary" :link="{ name: 'OrderStages' }">
        <ViewBoardsIcon class="w-5 h-5 mr-1"/>Этапы
      </Button>

      <v-can ability="crud orders">
        <Button color="blue" :link="{ name: 'OrderForm' }">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </v-can>
    </template>

    <Header>Фильтр</Header>

    <v-filter />

    <suspense-area v-if="current" :key="`orders-${current}-${key}`" > <kan-ban /> </suspense-area>

  </OfficeLayout>
</template>
