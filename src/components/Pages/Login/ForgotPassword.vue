<script setup>
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useForgotPassword from '~/services/forgotPassword.js';

const { refreshPassword, v$, form, refreshPageTitle, isLoading, isSuccessResponse, isErrorResponse, errorResponseMessage } = useForgotPassword();
</script>

<template>
    <LoginLayout :title="refreshPageTitle">
      <div class="mt-8">
        <div class="mt-6">
          <p v-if="isSuccessResponse" class="text-green-700 mb-6">{{ form.email }}</p>
          <p v-if="isErrorResponse" class="text-red-500 text-sm mb-6">{{ errorResponseMessage }}</p>
          <form class="space-y-6" @submit.prevent="refreshPassword">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля"
            v-model="v$.email.$model" v-if="!isSuccessResponse" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />

            <Button color="blue" class="w-full justify-center" @click.prevent="refreshPassword" :disabled="isLoading"
            :class="{ 'cursor-not-allowed': isLoading, 'opacity-60': isLoading }" v-if="!isSuccessResponse">
              <span v-if="!isLoading">Отправить</span>
              <Spinner  v-if="isLoading" />
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
