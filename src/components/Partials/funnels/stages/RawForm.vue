<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/funnels/stage';

const { stage, atMounted } = form();

await atMounted();

</script>

<template>
  <div>
    <div>
      <Input label="Название" v-model="stage.name" />
    </div>

    <div>
      <Input label="Цвет" type="color" v-model="stage.color" />
    </div>
  </div>
</template>
