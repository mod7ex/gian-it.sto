<script setup>
import { ChipIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import service from '~/services/orders/work';
import Table from '@/Partials/orders/items/Works.vue';
import useSuspense from '~/composables/useSuspense';

const SuspenseArea = useSuspense(Table);

const { render } = service();

</script>

<template>
    <div>
      <div class="mb-5">
        <v-can ability="crud works">
          <Button
            color="blue"
            @click="() => render()"
          >
            <ChipIcon class="w-5 h-5 mr-1"/>Добавить работу
          </Button>
        </v-can>
      </div>

      <suspense-area />

    </div>
</template>
