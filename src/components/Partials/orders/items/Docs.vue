<script setup>
import { EyeIcon, TrashIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import Badge from '@/UI/Badge.vue';
import store from '~/store/orders/documents';
import useConfirmDialog from '~/composables/useConfirmDialog';

const { state, loadTemplates, dropTemplate } = store;

const { drop } = useConfirmDialog();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Посмотреть', key: 'view' }, // fake keys
  { label: 'Удалить', key: 'drop' }, // fake keys
];

await loadTemplates();

defineEmits(['preveiw']);

</script>

<template>
  <Table
    :fields="fields"
    :items="state.templates"
    :actions="false"
  >
    <!-- Body -->

    <template #td-name="{ value }" >
      <span class="max-w-md w-full inline-block"><Badge :point="true" color="blue" class="text-sm">{{ value }}</Badge></span>
    </template>

    <template #td-view="{ index }" >
      <Link @click="$emit('preveiw', index)">
        <EyeIcon class="text-blue-600 h-6 hover:text-blue-900" />
      </Link>
    </template>

    <template #td-drop="{ item }" >
      <Link @click="() => drop(() => dropTemplate(item.id))">
        <TrashIcon class="text-blue-600 h-6 hover:text-blue-900" />
      </Link>
    </template>

    <!-- ****** -->
  </Table>
</template>
