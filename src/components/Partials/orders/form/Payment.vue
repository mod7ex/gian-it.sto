<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import service from '~/services/orders/payment';
import Payments from '@/Partials/orders/items/Payments.vue';
import useAppRouter from '~/composables/useAppRouter';
import useSuspense from '~/composables/useSuspense';

const SuspenseArea = useSuspense(Payments);

const { route } = useAppRouter();

const { render } = service(route.params.id);

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue" @click="() => render()">
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>Добавить оплату
        </Button>
      </div>

      <suspense-area />
    </div>
</template>
