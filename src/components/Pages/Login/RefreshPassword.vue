<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

const router = useRouter();
const { axiosInstance } = useApi();

const { token } = router.currentRoute.value.params;
const { email } = router.currentRoute.value.query;
const password = ref('');
const repeatPassword = ref('');
const error = ref(false);
const errorMessage = ref('');
const success = ref(false);

const refreshPageTitle = ref('Придумайте новый пароль');
const successMessage = ref('');
const loading = ref(false);

const savePassword = async () => {
  error.value = false;
  errorMessage.value = '';
  try {
    const res = await axiosInstance.post('auth/password/reset', {
      token,
      email,
      password: password.value,
    });

    success.value = true;
    successMessage.value = 'Теперь вы можете войти с новым паролем';
    refreshPageTitle.value = res.data.message;
  } catch (e) {
    error.value = true;
    errorMessage.value = e.response.data.message;
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <LoginLayout :title="refreshPageTitle">
    <div class="mt-8">
      <div class="mt-6">
        <p v-if="success" class="text-green-700 font-bold mb-6">
        {{ successMessage }}
        </p>
        <form action="#" method="POST" class="space-y-6">

          <Input v-if="!success" label="Новый пароль" type="password" v-model="password" />

          <div class="space-y-1" v-if="!success">
            <Input label="Повторите пароль" type="password" v-model="repeatPassword" />
          </div>

          <Button v-if="!success" :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full justify-center" @click.prevent="savePassword">
            <span v-if="!loading">Сохранить</span>
            <div
              v-if="loading"
              class="spinner-border animate-spin inline-block w-8 h-8 border-b-2 rounded-full"
              role="status"
            ></div>
          </Button>
          <p v-if="error" class="text-red-500 text-xs text-center font-bold">
          {{ errorMessage }}
          </p>

          <Link href="/" class="flex text-sm">
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
