<script setup>
import { useRouter } from 'vue-router';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useRefreshPassword from '~/services/refreshPassword.js';

const router = useRouter();
const { form, saveNewPassword, v$, refreshPageTitle, isLoading, isSuccessResponse,
  successResponseMessage, isErrorResponse, errorResponseMessage } = useRefreshPassword();

const { token } = router.currentRoute.value.params;
const { email } = router.currentRoute.value.query;
form.token = token;
form.email = email;

</script>

<template>
  <LoginLayout :title="refreshPageTitle">
    <div class="mt-8">
      <div class="mt-6">
        <p v-if="isSuccessResponse" class="text-green-700 text-sm mb-6"> {{ successResponseMessage }} </p>
         <p v-if="isErrorResponse" class="text-red-500 text-sm mb-6"> {{ errorResponseMessage }} </p>
        <form class="space-y-6" @submit.prevent="saveNewPassword">

          <Input v-if="!isSuccessResponse" label="Новый пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''" />

          <div class="space-y-1" v-if="!isSuccessResponse">
            <Input label="Повторите пароль" type="password" v-model="v$.confirmPassword.$model" :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''" />
          </div>

          <Button v-if="!isSuccessResponse" :disabled="isLoading" :class="{ 'cursor-not-allowed': isLoading, 'opacity-60': isLoading }" color="blue" class="w-full justify-center" @click.prevent="saveNewPassword">
            <span v-if="!isLoading">Сохранить</span>
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
