<script setup>
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import DialogModal from '@/UI/DialogModal.vue';
import Spinner from '@/UI/Spinner.vue';
import useProfileChangePasswordModal from '~/services/profileChangePasswordModal.js';

const { changeProfilePassword, closeModalChangePassword, v$, isLoading,
  isSuccessResponse, successResponseMessage, isErrorResponse, errorResponseMessage } = useProfileChangePasswordModal();

const emit = defineEmits({});

function emitEventCloseModal() {
  emit('closeModal');
  closeModalChangePassword();
}
</script>
<template>
<DialogModal title="Придумайте новый пароль">
  <template v-slot:dialog-inner>
    <div class="mt-6 mb-6">
      <p v-if="isSuccessResponse" class="text-green-700 text-sm text-center mb-6"> {{ successResponseMessage }}</p>
      <p v-if="isErrorResponse" class="text-red-500 text-sm text-center mb-6"> {{ errorResponseMessage }} </p>

      <form class="space-y-6">
        <Input label="Новый пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''" />
        <div class="space-y-1">

         <Input label="Повторите пароль" type="password" v-model="v$.confirmPassword.$model" :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''" />
        </div>

        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <Button :disabled="isLoading" :class="{ 'cursor-not-allowed': isLoading, 'opacity-60': isLoading }" color="blue" class="w-full inline-flex justify-center  px-4 py-2 sm:col-start-2" @click.prevent="changeProfilePassword">
            <span v-if="!isLoading">Сохранить</span>
            <Spinner  v-if="isLoading" />
          </Button>

          <Button color="gray" @click.prevent="emitEventCloseModal" class="mt-3 w-full inline-flex justify-center px-4 py-2 sm:mt-0 sm:col-start-1">Закрыть</Button>
        </div>
        </form>
    </div>
    </template>
    </DialogModal>
</template>
