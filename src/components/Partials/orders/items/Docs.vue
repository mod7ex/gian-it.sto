<script setup>
import { EyeIcon, TrashIcon, DownloadIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Table from '@/Layout/Table.vue';
import Badge from '@/UI/Badge.vue';
import service from '~/services/orders/template';

const { prepare, state } = service();

const fields = [
  { label: 'Название', key: 'label' },
  { label: 'Посмотреть', key: 'link' }, // fake keys
  // { label: 'Удалить', key: 'drop' }, // fake keys
];

await prepare();

defineEmits(['preview']);

</script>

<template>

  <Table
    :fields="fields"
    :items="state.links"
    :actions="false"
  >
    <!-- Body -->
    <template #td-label="{ value }" >
      <span class="max-w-md w-full inline-block">
        <Badge :point="true" color="blue" class="text-sm">{{ value }}</Badge>
      </span>
    </template>

    <template #td-link="{ value }" >
      <Link @click="$emit('preview', value)">
        <EyeIcon class="text-blue-600 h-6 hover:text-blue-900" />
      </Link>
    </template>

<!--
      <template #td-download="{ index }" >
        <Link @click="$emit('download', index)">
          <DownloadIcon class="text-blue-600 h-6 hover:text-blue-900" />
        </Link>
      </template>
-->

<!--
      <template #td-drop="{ item }" >
      <Link @click="() => drop(() => dropTemplate(item.id))">
        <TrashIcon class="text-blue-600 h-6 hover:text-blue-900" />
      </Link>
    </template>
-->
    <!-- ****** -->
  </Table>
</template>
