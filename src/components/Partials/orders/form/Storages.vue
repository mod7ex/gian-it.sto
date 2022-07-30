<script setup>
import { CogIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import service from '~/services/orders/storage-requests.js';
import Table from '@/Partials/orders/items/Requests.vue';
import useSuspense from '~/composables/useSuspense';

const SuspenseArea = useSuspense(Table);

const { render } = service();

</script>

<template>
    <div>

      <div class="mb-5">
        <Button color="blue" @click="() => render()">
          <CogIcon class="w-5 h-5 mr-1"/>Добавить запчасть
        </Button>
      </div>

      <suspense-area />

    </div>
</template>
