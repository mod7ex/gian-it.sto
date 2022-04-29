<script setup>
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useForgotPassword from '~/services/forgotPassword.js';

const { refreshPassword, v$, data, form, loading, success, errorMsg } = useForgotPassword();
</script>

<template>
    <LoginLayout :title="data?.message ?? 'Забыли пароль?'">
      <div class="mt-8">
        <div class="mt-6">

          <p v-if="success" class="text-green-700 mb-6">{{ form.email }}</p>
          <p v-else class="text-red-500 text-sm mb-6">{{ errorMsg ?? 'Undefined (network?) error' }}</p>

          <form class="space-y-6" @submit.prevent="refreshPassword">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля"
            v-model="v$.email.$model" v-if="!success" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />

            <Button color="blue" class="w-full justify-center" @click.prevent="refreshPassword" :disabled="loading"
            :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" v-if="!success">

              <span v-if="!loading">Отправить</span>
              <Spinner v-else />

            </Button>
            <!-- We need this button to make form generally submittable -->
            <button class="hidden" type="submit">accessible submit button</button>

            <Link to="/" class="flex text-sm">
              <ArrowNarrowLeftIcon class="h-5 w-5 mr-1" aria-hidden="true" />
              На страницу входа
            </Link>
          </form>
        </div>
      </div>
    </LoginLayout>
</template>

<style scoped>

</style>
