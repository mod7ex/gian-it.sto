<script setup>
import Dialog from './../UI/Dialog.vue';
import Button from './../UI/Button.vue';
import { ref } from 'vue';

const success = ref(false);
const danger = ref(false);
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Диалоговые окна</h2>

  <Dialog title="Успешно!" text="Операция выполнена успешно" :open="success" @close="() => success = false" />

  <Dialog title="Удалить?"
          text="Вы уверены что хотите удалить элемент?"
          :open="danger"
          @close="() => danger = false"
          type="danger"
  >
    <template v-slot:actions>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <Button @click="() => (danger = !danger)" class="justify-center">
          Закрыть
        </Button>

        <Button color="red" @click="() => (danger = !danger)" class="mr-3 justify-center">
          Удалить
        </Button>
      </div>
    </template>
  </Dialog>

  <Button color="green" @click="() => (success = !success)" class="mr-3">
    Открыть
  </Button>

  <Button color="red" @click="() => (danger = !danger)">
    Открыть
  </Button>
</template>

<style scoped>

</style>
