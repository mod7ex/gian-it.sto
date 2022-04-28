<script setup>
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import loginHandler from '~/services/login.js';

const { loginUser, v$, loading, success, errorMsg } = loginHandler();

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
            :disabled="loading"
            :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }"
            color="blue"
            class="w-full justify-center"
            @click.prevent="loginUser"
          >
            <span v-if="!loading">Войти</span><Spinner v-else />
          </Button>
          <!-- We need this button to make form generally submittable -->
            <button class="hidden" type="submit">accessible submit button</button>
        </form>

        <p v-if="!success" class="text-red-500 text-sm text-center mt-6">
          {{ errorMsg ?? 'Undefined (network?) error' }}
        </p>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped></style>
