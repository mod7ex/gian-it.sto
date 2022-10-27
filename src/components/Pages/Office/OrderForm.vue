<script setup>
import { ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import { ref, defineAsyncComponent, onScopeDispose, computed, watch, onMounted } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Tabs from '@/UI/Tabs.vue';
import useSuspense from '~/composables/useSuspense';
import service from '~/services/orders/form';
import departmentStore from '~/store/departments';
import useConfirmDialog from '~/composables/useConfirmDialog';
import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

const { drop } = useConfirmDialog();

const { current: department } = departmentStore;

const { fields, isEditPage, clearMemory, dropOrder, route, router, atMounted } = service();

onMounted(async () => { if (!fields?.id) { await atMounted(); } });

const suspenseArea = useSuspense();

const tabs = [
  // Order matters
  { tab: 'main', permissions: [], label: 'Форма', component: defineAsyncComponent(() => import('@/Partials/orders/form/Main.vue')) },
  { tab: 'tasks', permissions: [], label: 'Задачи', component: defineAsyncComponent(() => import('@/Partials/orders/form/Tasks.vue')) },
  { tab: 'docs', permissions: ['crud documents', 'crud document templates'], label: 'Документы', component: defineAsyncComponent(() => import('@/Partials/orders/form/Docs.vue')) },
  { tab: 'storages', permissions: [], label: 'Склад', component: defineAsyncComponent(() => import('@/Partials/orders/form/Storages.vue')) },
  { tab: 'works', permissions: ['crud works', 'read works'], label: 'Работы', component: defineAsyncComponent(() => import('@/Partials/orders/form/Works.vue')) },
  { tab: 'diagnostic-card', permissions: [], label: 'Диагностическая карта', component: defineAsyncComponent(() => import('@/Partials/orders/form/DiagnosticCards.vue')) },
  { tab: 'comments', permissions: [], label: 'Комментарии', component: defineAsyncComponent(() => import('@/Partials/Comments.vue')), props: { model: 'order', id: computed(() => `${route.params?.id ?? ''}`) } },
  { tab: 'payment', permissions: [], label: 'Оплаты', component: defineAsyncComponent(() => import('@/Partials/orders/form/Payment.vue')) },
];

const current = ref(isEditPage.value ? (route.query.tab ?? 'main') : 'main');

if (isEditPage.value) {
  watch(current, (tab) => {
    router.push({ name: 'OrderEdit', params: route.params, query: { tab } });
  }, { immediate: true });
}

const theTab = computed(() => tabs.find(({ tab }) => tab === current.value));

// Filter by permissions
const getTabs = () => tabs.filter(({ permissions }) => userHasAtLeastOnePermission(permissions, true)).map(({ tab, label }) => ({ label, tab }));
const labels = computed(() => (!isEditPage.value ? [{ label: tabs[0].label, tab: tabs[0].tab }] : getTabs()));

onScopeDispose(clearMemory);

</script>

<template>
  <OfficeLayout title="Создание нового заказ наряда">

    <template #actions>
      <div class="mr-2 text-lg">Сумма: <span class="font-bold">{{ fields?.total_sum ?? ' ..., ... ' }} ₽</span></div>

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

    <suspense-area v-if="current && department" :key="`order-form-${current}-${department}-${route.params?.id ?? 'none'}`">
      <component :is="theTab.component" v-bind="theTab.props" />
    </suspense-area>

  </OfficeLayout>
</template>
