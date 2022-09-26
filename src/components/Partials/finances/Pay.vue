<script setup >
import { RefreshIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import usePay from '~/composables/usePay';

const props = defineProps({
  status: {
    type: [String, null],
  },

  resource: {
    type: [String, null],
    default: 'finance',
  },

  id: {
    type: [String, Number],
  },

  cb: {
    type: Function,
    default: () => {},
  },

  paymentWrapper: {
    type: Function,
  },

});

const { loading, checkStatus, pay } = usePay({ resource: props.resource, cb: props.cb });

const payment_status_map = {
  inprogress: { color: 'yellow', label: 'Ожидает' },
  ready: { color: 'green', label: 'Oплаченный' },
  error: { color: 'red', label: 'Отменено' },
  unknown: { color: 'gray', label: 'Неизвестный' },
};

const handelClick = async (v) => {
  await props.paymentWrapper(() => pay(v)); // () => pay(v) returns {success, ...}
};

</script>

<template>
  <span class="flex items-center" >
    <button
      v-if="(!!status && status != 'ready') || loading" :disabled="loading"
      @click="() => checkStatus(id)"
      class="payment_status"
      :data-tooltip="loading ? 'загрузка...' :'Проверить статус'"
    >
      <RefreshIcon class="h-4 w-4" :class="{rotating: loading}" />
    </button>

    <Badge v-if="status" :point="true" :color="payment_status_map[status ?? 'ready']?.color" >
      {{ payment_status_map[status ?? 'unknown']?.label ?? status }}
    </Badge>

    <Link v-if="!status && !loading" @click="() => handelClick(id)">
      Оплатить
    </Link>
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
