<script setup>
import Alert from './../UI/Alert.vue';
import { CheckCircleIcon, XIcon, InformationCircleIcon, ExclamationIcon, XCircleIcon } from '@heroicons/vue/solid';
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Сообщения</h2>
  <Alert title="Заголовок" text="Текст сообщения" :close="true" :icon="InformationCircleIcon" class="mt-5" />
  <Alert title="Заголовок" :close="true" :icon="ExclamationIcon" color="yellow" class="mt-5">
    <template v-slot:text>
      <ul role="list" class="list-disc pl-5 space-y-1 mt-2 text-sm text-yellow-700">
        <li>
          Сообщение 1
        </li>
        <li>
          Сообщение 2
        </li>
      </ul>
    </template>
  </Alert>
  <Alert title="Сообщение об успешной операции" :close="true" :icon="CheckCircleIcon" color="green" class="mt-5" />
  <Alert title="Сообщение о ошибке" :close="true" :icon="XCircleIcon" color="red" class="mt-5" />
</template>

<style scoped>

</style>
