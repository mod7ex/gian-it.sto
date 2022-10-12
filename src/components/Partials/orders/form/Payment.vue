<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/outline';
import { onScopeDispose } from 'vue';
import Payments from '@/Partials/orders/items/Payments.vue';
import useAppRouter from '~/composables/useAppRouter';
import useSuspense from '~/composables/useSuspense';
import service from '~/services/finances/index';
import form from '~/services/finances/form';
import Button from '@/UI/Button.vue';

const { route } = useAppRouter();

const { cleanUp } = service(route.params.id);

const SuspenseArea = useSuspense(Payments);

const { render, cleanUpForm } = form(route.params.id);

onScopeDispose(() => { cleanUpForm(); cleanUp(); });

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue" @click="() => render(undefined, route.params.id)">
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>Добавить оплату
        </Button>
      </div>

      <suspense-area  />
    </div>
</template>
