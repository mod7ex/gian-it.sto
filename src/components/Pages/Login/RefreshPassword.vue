<script setup>
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import { onMounted } from 'vue';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useRefreshPassword from '~/services/auth/refreshPassword.js';
import useAppRouter from '~/composables/useAppRouter.js';

const { router } = useAppRouter();

const { save, form, v$, loading, success, errorMsg, data, reponce, ready } = useRefreshPassword();

onMounted(() => {
  const { token } = router.currentRoute.value.params;
  const { email } = router.currentRoute.value.query;

  form.token = token;
  form.email = email;
});

</script>

<template>
  <LoginLayout :title="data?.message ?? 'Придумайте новый пароль'">
    <div class="mt-8">
      <div class="mt-6">

        <p v-if="ready && success " class="text-green-700 text-sm mb-6">{{ data.message ?? 'Ваш пароль был сброшен' }}</p>
        <p v-if="ready && !success " class="text-red-500 text-sm mb-6">{{ errorMsg ?? 'Undefined (network?) error' }}</p>

        <form class="space-y-6" @submit.prevent="save">

          <Input v-if="!reponce" label="Новый пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''" />

          <div class="space-y-1" v-if="!reponce">
            <Input label="Повторите пароль" type="password" v-model="v$.confirmPassword.$model" :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''" />
          </div>

          <Button v-if="!reponce" :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full justify-center" @click.prevent="save">
            <Spinner  v-if="loading" />
            <span v-else>Сохранить</span>
          </Button>

          <!-- We need this button to make form generally submittable -->
          <button class="hidden" type="submit">accessible submit button</button>

          <Link :to="{name: 'Login'}" class="flex text-sm">
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
