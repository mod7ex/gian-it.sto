<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useLogin from '~/services/login.js';

const router = useRouter();
const { loginUser, authByTokenFromLocalstorage, v$, isLoading, isErrorResponse, errorResponseMessage } = useLogin(router);

onMounted(() => {
  authByTokenFromLocalstorage();
});
</script>

<template>
  <LoginLayout title="Войдите в ваш аккаунт">
    <div class="mt-8">
      <div class="mt-6">
        <form class="space-y-6" @submit.prevent="loginUser">
          <Input label="E-mail" type="email" v-model="v$.email.$model" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />

          <div class="space-y-1">
            <Input label="Пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$errors[0].$message : ''" />

          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <Link to="/forgot-password">Забыли пароль?</Link>
            </div>
          </div>

          <Button
            :disabled="isLoading"
            :class="{ 'cursor-not-allowed': isLoading, 'opacity-60': isLoading }"
            color="blue"
            class="w-full justify-center"
            @click.prevent="loginUser"
          >
            <span v-if="!isLoading">Войти</span>
            <Spinner  v-if="isLoading" />
          </Button>
          <!-- We need this button to make form generally submittable -->
            <button class="hidden" type="submit">accessible submit button</button>
        </form>
        <p v-if="isErrorResponse" class="text-red-500 text-sm text-center mt-6">
          {{ errorResponseMessage }}
        </p>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped></style>
