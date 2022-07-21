<script setup>
import { ChipIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import service from '~/services/orders/work';

const { drop } = useConfirmDialog();

const { render, works } = service();

const fields = [
  { label: 'Название', key: 'id' },
];

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue" @click="() => render()">
          <ChipIcon class="w-5 h-5 mr-1"/>Добавить работу
        </Button>
      </div>

      <Table
        :fields="fields"
        :items="works"
        @delete="(id) => drop(() => void(id))"
        @edit="(id) => void(id)"
      >
          <!-- Body -->

          <template #td-id="{ item }" >
            <Badge :point="true" color="blue" class="text-sm">{{ docs[item].id }}</Badge>
          </template>
<!--
          <template #td-view="{ item }" >
            <Link @click="toVisualize = item">Посмотреть</Link>
          </template>

          <template #td-drop="{ item }" >
            <Link @click="() => handleDocToggle(item, true)">Удалить</Link>
          </template>
-->

          <!-- ****** -->
      </Table>
    </div>
</template>
