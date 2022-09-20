<script setup >
import { RefreshIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import store from '~/store/finances/finances';
import usePay from '~/composables/usePay';

defineProps({
  status: {
    type: [String, null],
  },
  id: {
    type: [String, Number],
  },
});

const { updateStatus } = store;
const { statusRef, checkStatus, paymentRef, pay } = usePay({ cb: updateStatus });

const payment_status_map = {
  inprogress: { color: 'yellow', label: 'Ожидает' },
  ready: { color: 'green', label: 'оплаченный' },
  error: { color: 'red', label: 'Отменено' },
};

</script>

<template>
  <span class="flex items-center" >
    <button
      v-if="(!!status && status != 'ready') || paymentRef" :disabled="statusRef"
      @click="() => checkStatus(id)"
      class="payment_status"
      :data-tooltip="statusRef ? 'проверка статуса...' : (paymentRef ? 'платеж в процессе' : 'Проверить статус')"
    >
      <RefreshIcon class="h-4 w-4" :class="{rotating: statusRef || paymentRef}" />
    </button>

    <Badge v-if="status" :point="true" :color="payment_status_map[status ?? 'ready']?.color" >
      {{ payment_status_map[status]?.label ?? status }}
    </Badge>

    <Link v-if="!status && !paymentRef" @click="() => pay(id)">Оплатить</Link>
  </span>
</template>

<style>
.payment_status {
  position: relative;
}

.payment_status::before {
  content: attr(data-tooltip);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  color: white;
  padding: 3px 6px;
  left: -300%;
  bottom: 150%;
  display: none;
}

.payment_status:hover::before {
  display: block;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: rotating 2s linear infinite;
}
</style>
