<script setup>
import { ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import { ref, defineAsyncComponent, onUnmounted, computed } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Tabs from '@/UI/Tabs.vue';
import useSuspense from '~/composables/useSuspense';
import service from '~/services/orders/form';
import departmentStore from '~/store/departments';
import useConfirmDialog from '~/composables/useConfirmDialog';

const { drop } = useConfirmDialog();

const { current: department } = departmentStore;

const { fields, isEditPage, clearMemory, dropOrder } = service();

const suspenseArea = useSuspense();

const tabs = [
  // Order matters

  { label: 'Документы', component: defineAsyncComponent(() => import('@/Partials/orders/form/Docs.vue')) },
  { label: 'Задачи', component: defineAsyncComponent(() => import('@/Partials/orders/form/Tasks.vue')) },
  { label: 'Оплаты', component: defineAsyncComponent(() => import('@/Partials/orders/form/Payment.vue')) },
  { label: 'Форма', component: defineAsyncComponent(() => import('@/Partials/orders/form/Main.vue')) },
  { label: 'Склад', component: defineAsyncComponent(() => import('@/Partials/orders/form/Storages.vue')) },
  { label: 'Работы', component: defineAsyncComponent(() => import('@/Partials/orders/form/Works.vue')) },
  { label: 'Диагностическая карта', component: defineAsyncComponent(() => import('@/Partials/orders/form/DiagnosticCards.vue')) },
  { label: 'Комментарии', component: defineAsyncComponent(() => import('@/Partials/Comments.vue')), props: { model: 'order', id: computed(() => `${fields?.id ?? ''}`) } },
];

const current = ref(0);

const labels = computed(() => (!isEditPage.value ? [tabs[0].label] : tabs.map(({ label }) => label)));

onUnmounted(clearMemory);

</script>

<template>
  <OfficeLayout title="Создание нового заказ наряда">

    <template #actions>
      <div class="mr-2 text-lg">Сумма: <span class="font-bold">100 000 ₽</span></div>

      <Button type="secondary" :link="{ name: 'Orders' }">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>К заказ-нарядам
      </Button>

      <Button color="red" v-if="isEditPage" @click="() => drop(dropOrder)">
        <XIcon class="w-5 h-5 mr-1"/>Удалить
      </Button>
    </template>

    <template #before>
      <Tabs v-model="current" :tabs="labels" class="px-3 sm:px-4 lg:px-5" />
    </template>

<!--
  <p>TODO: get rid of re-rendring</p>
-->

    <suspense-area :key="`suspense-${current}-${department}`">
      <component :is="tabs[current].component" v-bind="tabs[current].props" />
    </suspense-area>
    <!-- ISSUE : solved using the v-show directive ,but there might still a small issue !  -->

    <!--
    <suspense-area :key="`order-${department}`">
        <component v-for="(item, i) in tabs" :key="item.label" :is="item.component" v-bind="item.props" v-show="i === current" />
    </suspense-area>
    -->

  </OfficeLayout>
</template>
