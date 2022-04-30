<script setup>
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import DialogModal from '@/UI/DialogModal.vue';
import Spinner from '@/UI/Spinner.vue';
import handler from '~/services/profileChangePassword.js';

const { v$, changeProfilePassword, data, loading, errorMsg, success, ready, isModalUp, form } = handler();

defineEmits(['close']);

</script>
<template>
<DialogModal title="Придумайте новый пароль" :open="isModalUp">
  <template v-slot:dialog-inner>
    <div class="mt-6 mb-6">

      <p v-if="ready && success" class="text-green-700 text-sm text-center mb-6">{{ data?.message ?? 'Пароль обновлён' }}</p>
      <p v-if="ready && !success" class="text-red-500 text-sm text-center mb-6"> {{ errorMsg ?? 'Undefined (network?) error' }} </p>

      <form class="space-y-6">
        <Input label="Новый пароль" type="password" v-model="form.password" @blured="v$.password.$touch" :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''" />

        <div class="space-y-1">
         <Input label="Повторите пароль" type="password" v-model="form.confirmPassword" @blured="v$.confirmPassword.$touch" :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''" />
        </div>

        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">

          <Button :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full inline-flex justify-center  px-4 py-2 sm:col-start-2" @click.prevent="changeProfilePassword">
            <Spinner  v-if="loading" />
            <span v-else>Сохранить</span>
          </Button>

          <Button color="gray" @click.prevent="$emit('close')" class="mt-3 w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:col-start-1">Закрыть</Button>
        </div>
      </form>
    </div>
  </template>
</DialogModal>
</template>
