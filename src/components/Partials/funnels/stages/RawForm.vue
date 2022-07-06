<script setup>
import Input from '@/UI/Input.vue';
import form from '~/services/funnels/stage';

const { stage, atMounted, v$ } = form();

await atMounted();

</script>

<template>
  <div>
    <div>
      <Input
        label="Название"
        v-model="stage.name"
        :required="true"
        :error="v$.name.$errors[0]?.$message"
        @blured="v$.name.$touch"
      />
    </div>

    <div>
      <Input
        label="Цвет"
        type="color"
        v-model="stage.color"
        :required="true"
        :error="v$.color.$errors[0]?.$message"
        @blured="v$.color.$touch"
      />
    </div>
  </div>
</template>
