<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/orders/stages';

const { order_stage, atMounted } = form();

await atMounted();

</script>

<template>
  <div>
    <div>
      <Input
        label="Название"
        v-model="order_stage.name"
        :required="true"
      />
    </div>

    <div>
      <Input
        label="Цвет"
        type="color"
        v-model="order_stage.color"
        :required="true"
      />
    </div>
  </div>
</template>
