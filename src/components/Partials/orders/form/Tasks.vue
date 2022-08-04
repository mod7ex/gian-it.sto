<script setup>
import { PlusCircleIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense.js';
import TasksTable from '@/Partials/tasks/Table.vue';
import useAppRouter from '~/composables/useAppRouter.js';

const SuspenseArea = useSuspense();
const { route } = useAppRouter();

</script>

<template>
  <div>
      <div class="mb-5">
        <Button color="blue" :link="{ name: 'TaskCreate', query: { order_id: route.params.id } }" >
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить задачу
        </Button>
      </div>

      <suspense-area >
        <tasks-table :order_id="route.params.id" />
      </suspense-area>
  </div>
</template>
