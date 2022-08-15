<script setup>
import service from '~/services/orders/payment';
import { generateShapedIdfromId } from '~/helpers';

const { invoice, atMounted } = service();

await atMounted();

</script>

<template>
    <div>

      <h3 class="flex justify-between mb-3" >
        <span>Заказ наряд: </span>
        <span>№{{ generateShapedIdfromId(invoice?.order_id) }}</span>
      </h3>
      <h3 class="flex justify-between mb-3" >
        <span>Сумма к оплате: </span>
        <span>{{ invoice?.sum }}₽</span>
      </h3>
      <h3 class="flex justify-between mb-3" >
        <span>Вид оплаты: </span>
        <span>{{ invoice?.type === 'cache' ? 'Наличный' : 'Безналичный' }}</span>
      </h3>

    </div>
</template>
